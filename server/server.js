
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' })); 

// Helper
const parseJson = (str) => {
    try { return typeof str === 'string' ? JSON.parse(str) : str; } 
    catch (e) { return null; }
};

// Root Route (Health Check)
app.get('/', (req, res) => {
    res.send('Idehpardaz API Server is running...');
});

// --- ROUTES ---

// 1. Initial Data Load (Get Everything)
app.get('/api/init', async (req, res) => {
    try {
        const [projects] = await db.query('SELECT * FROM projects');
        const [articles] = await db.query('SELECT * FROM articles');
        const [messages] = await db.query('SELECT * FROM messages');
        const [users] = await db.query('SELECT * FROM users');
        const [testimonials] = await db.query('SELECT * FROM testimonials');
        const [media] = await db.query('SELECT * FROM media');
        const [configs] = await db.query('SELECT * FROM site_config');

        const formattedProjects = projects.map(p => ({ ...p, ...p.json_data, featured: !!p.featured }));
        const formattedArticles = articles.map(a => ({ ...a, ...a.json_data }));
        
        const configMap = {};
        configs.forEach(c => {
            configMap[c.config_key] = c.config_value;
        });

        res.json({
            projects: formattedProjects,
            blog: formattedArticles,
            messages,
            users,
            testimonials,
            media,
            settings: configMap.settings || {},
            home: configMap.home || {},
            about: configMap.about || {},
            pageLayouts: configMap.page_layouts || {},
            pageHeaders: configMap.page_headers || {},
            servicesPage: configMap.services_page || [],
            solutions: configMap.solutions || {}
        });
    } catch (err) {
        console.error("DB Init Error:", err.message);
        res.status(500).json({ error: 'Database error: ' + err.message });
    }
});

// 2. Generic Config Update
app.post('/api/config/:key', async (req, res) => {
    const { key } = req.params;
    const data = req.body;
    try {
        await db.query(
            'INSERT INTO site_config (config_key, config_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE config_value = ?',
            [key, JSON.stringify(data), JSON.stringify(data)]
        );
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Projects CRUD
app.post('/api/projects', async (req, res) => {
    const p = req.body;
    const jsonData = JSON.stringify({
        gallery: p.gallery, excerpt: p.excerpt, problem: p.problem, solution: p.solution, 
        result: p.result, techStack: p.techStack, kpis: p.kpis, seo: p.seo
    });
    try {
        if (p.id && typeof p.id === 'number') {
            await db.query(
                'UPDATE projects SET title=?, client=?, category=?, industry=?, image=?, featured=?, json_data=? WHERE id=?',
                [p.title, p.client, p.category, p.industry, p.image, p.featured, jsonData, p.id]
            );
        } else {
            await db.query(
                'INSERT INTO projects (title, client, category, industry, image, featured, json_data) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [p.title, p.client, p.category, p.industry, p.image, p.featured, jsonData]
            );
        }
        const [rows] = await db.query('SELECT * FROM projects');
        res.json(rows.map(r => ({ ...r, ...r.json_data, featured: !!r.featured })));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/projects/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM projects WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. Blog CRUD
app.post('/api/blog', async (req, res) => {
    const a = req.body;
    const jsonData = JSON.stringify({
        tags: a.tags, seo: a.seo, allowComments: a.allowComments, authorRole: a.authorRole, authorAvatar: a.authorAvatar, readTime: a.readTime
    });
    try {
        if (a.id && typeof a.id === 'number') {
            await db.query(
                'UPDATE articles SET title=?, slug=?, status=?, category=?, author=?, image=?, excerpt=?, content=?, json_data=? WHERE id=?',
                [a.title, a.slug, a.status, a.category, a.author, a.image, a.excerpt, a.content, jsonData, a.id]
            );
        } else {
            await db.query(
                'INSERT INTO articles (title, slug, status, category, author, image, excerpt, content, json_data) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [a.title, a.slug, a.status, a.category, a.author, a.image, a.excerpt, a.content, jsonData]
            );
        }
        const [rows] = await db.query('SELECT * FROM articles');
        res.json(rows.map(r => ({ ...r, ...r.json_data })));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/blog/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM articles WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 5. Messages
app.post('/api/messages', async (req, res) => {
    const m = req.body;
    try {
        await db.query(
            'INSERT INTO messages (name, email, phone, service, message, status) VALUES (?, ?, ?, ?, ?, ?)',
            [m.name, m.email, m.phone, m.service, m.message, 'new']
        );
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 6. Media
app.post('/api/media', async (req, res) => {
    const m = req.body;
    const item = Array.isArray(m) ? m[0] : m;
    try {
        if (!item.id || isNaN(item.id)) {
             await db.query(
                'INSERT INTO media (name, url, type, category, size, dimensions) VALUES (?, ?, ?, ?, ?, ?)',
                [item.name, item.url, item.type, item.category, item.size, item.dimensions]
            );
        }
        const [rows] = await db.query('SELECT * FROM media');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/media/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM media WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
