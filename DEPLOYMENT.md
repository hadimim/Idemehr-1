# راهنمای جامع استقرار (Deployment) روی سرور لینوکس (Ubuntu)

این راهنما مراحل کامل راه‌اندازی وب‌سایت **ایده‌پرداز مهر** (شامل فرانت‌ند React، بک‌ند Node.js و دیتابیس MySQL) را روی یک سرور خام Ubuntu 20.04/22.04 توضیح می‌دهد.

---

## پیش‌نیازها

1.  یک سرور مجازی (VPS) با سیستم عامل Ubuntu.
2.  دسترسی Root یا کاربری با دسترسی sudo.
3.  یک دامنه (Domain) که به IP سرور متصل شده باشد (از طریق A Record).

---

## مرحله ۱: آماده‌سازی سرور

ابتدا پکیج‌های سیستم را به‌روزرسانی کنید و ابزارهای اولیه را نصب نمایید.

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install curl git build-essential -y
```

---

## مرحله ۲: نصب Node.js

ما از نسخه LTS (پایدار) Node.js استفاده می‌کنیم.

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# بررسی نصب موفق
node -v
npm -v
```

---

## مرحله ۳: نصب و تنظیم دیتابیس MySQL

```bash
sudo apt install mysql-server -y
```

پس از نصب، وارد کنسول MySQL شوید و دیتابیس و کاربر مخصوص را بسازید:

```bash
sudo mysql
```

داخل محیط MySQL دستورات زیر را خط به خط اجرا کنید (رمز عبور دلخواه را جایگزین `YOUR_PASSWORD` کنید):

```sql
-- ساخت دیتابیس
CREATE DATABASE idehpardaz_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- ساخت کاربر
CREATE USER 'ideh_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'YOUR_PASSWORD';

-- دادن دسترسی کامل
GRANT ALL PRIVILEGES ON idehpardaz_db.* TO 'ideh_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## مرحله ۴: انتقال پروژه به سرور

پروژه را می‌توانید از طریق Git کلون کنید یا فایل‌های فشرده (Zip) را آپلود کنید. فرض می‌کنیم پروژه در مسیر `/var/www/idehpardaz` قرار می‌گیرد.

```bash
# ایجاد دایرکتوری
sudo mkdir -p /var/www/idehpardaz
sudo chown -R $USER:$USER /var/www/idehpardaz

# (اگر از گیت استفاده می‌کنید)
# git clone https://github.com/your-repo/idehpardaz.git /var/www/idehpardaz

# اگر فایل‌ها را دستی آپلود کرده‌اید، به پوشه پروژه بروید:
cd /var/www/idehpardaz
```

---

## مرحله ۵: راه‌اندازی Backend (Node.js)

1.  **نصب وابستگی‌ها:**

    ```bash
    cd server
    npm install
    ```

2.  **تنظیم متغیرهای محیطی:**
    یک فایل `.env` بسازید:

    ```bash
    nano .env
    ```

    محتوای زیر را داخل آن قرار دهید (با اطلاعات دیتابیس مرحله ۳):

    ```env
    PORT=3001
    DB_HOST=localhost
    DB_USER=ideh_user
    DB_PASSWORD=YOUR_PASSWORD
    DB_NAME=idehpardaz_db
    ```
    با `Ctrl+X` سپس `Y` و `Enter` ذخیره کنید.

3.  **کاشت داده‌های اولیه (Database Seeding):**
    این دستور جداول را می‌سازد و محتوای پیش‌فرض سایت را وارد می‌کند.

    ```bash
    npm run seed
    ```

4.  **اجرای دائمی سرور با PM2:**
    برای اینکه سرور همیشه روشن بماند (حتی بعد از ریستارت)، از PM2 استفاده می‌کنیم.

    ```bash
    sudo npm install -g pm2
    pm2 start server.js --name "ideh-api"
    pm2 save
    pm2 startup
    ```

---

## مرحله ۶: راه‌اندازی Frontend (React Build)

1.  **نصب وابستگی‌ها و بیلد:**

    ```bash
    cd .. # برگشت به ریشه پروژه
    npm install
    npm run build
    ```

    این دستور پوشه‌ای به نام `dist` می‌سازد که حاوی فایل‌های نهایی سایت است.

---

## مرحله ۷: نصب و تنظیم Nginx (وب‌سرور)

Nginx درخواست‌های کاربران را مدیریت می‌کند: فایل‌های فرانت‌ند را نمایش می‌دهد و درخواست‌های API را به Node.js می‌فرستد.

1.  **نصب Nginx:**

    ```bash
    sudo apt install nginx -y
    ```

2.  **تنظیم کانفیگ سایت:**
    یک فایل تنظیمات جدید بسازید:

    ```bash
    sudo nano /etc/nginx/sites-available/idehpardaz
    ```

    کد زیر را درون آن کپی کنید (به جای `your_domain.com` دامنه خود یا IP سرور را بنویسید):

    ```nginx
    server {
        listen 80;
        server_name your_domain.com www.your_domain.com;

        root /var/www/idehpardaz/dist;
        index index.html;

        # تنظیمات فرانت‌ند (SPA)
        location / {
            try_files $uri $uri/ /index.html;
        }

        # تنظیمات پراکسی برای API
        location /api/ {
            proxy_pass http://localhost:3001/api/;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
    ```

3.  **فعال‌سازی سایت:**

    ```bash
    sudo ln -s /etc/nginx/sites-available/idehpardaz /etc/nginx/sites-enabled/
    sudo rm /etc/nginx/sites-enabled/default  # حذف تنظیمات پیش‌فرض (اختیاری)
    
    # تست تنظیمات
    sudo nginx -t
    
    # ریستارت سرویس
    sudo systemctl restart nginx
    ```

---

## مرحله ۸: تنظیم فایروال (UFW)

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

---

## مرحله ۹: دریافت گواهینامه SSL رایگان (HTTPS)

برای امنیت سایت، با استفاده از Certbot روی دامنه خود SSL نصب کنید.

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your_domain.com -d www.your_domain.com
```

---

## تمام شد! 🎉

سایت شما اکنون در آدرس دامنه شما در دسترس است.

- **پنل مدیریت:** `your_domain.com/login`
- **نام کاربری ادمین:** `admin`
- **رمز عبور ادمین:** `admin`

### دستورات مفید برای نگهداری:

- مشاهده لاگ‌های بک‌ند: `pm2 logs ideh-api`
- ریستارت بک‌ند: `pm2 restart ideh-api`
- آپدیت سایت:
  1. `git pull`
  2. `npm install` (اگر پکیج جدیدی بود)
  3. `npm run build`
  4. `pm2 restart ideh-api` (اگر کد بک‌ند تغییر کرده بود)
