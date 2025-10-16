const express = require('express');
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;

const POSTS_DIR = path.join(__dirname, 'posts');

// Ensure posts directory exists
if (!fs.existsSync(POSTS_DIR)) fs.mkdirSync(POSTS_DIR, { recursive: true });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// List posts
app.get('/', (req, res) => {
  fs.readdir(POSTS_DIR, (err, files) => {
    if (err) return res.status(500).send('Unable to read posts');
    const posts = files.filter(f => f.endsWith('.md')).map(f => {
      const filePath = path.join(POSTS_DIR, f);
      const raw = fs.readFileSync(filePath, 'utf8');
      const firstLine = raw.split('\n')[0] || f;
      const title = firstLine.replace(/^#\s+/, '') || f;
      return { filename: f, title };
    });
    res.render('index', { posts });
  });
});

// Render post
app.get('/post/:filename', (req, res) => {
  const filename = req.params.filename;
  const safe = path.basename(filename);
  const filePath = path.join(POSTS_DIR, safe);
  if (!filePath.startsWith(POSTS_DIR)) return res.status(400).send('Invalid filename');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(404).send('Post not found');
    const html = marked.parse(data);
    res.render('post', { html, title: data.split('\n')[0].replace(/^#\s+/, '') || safe });
  });
});

// New post form
app.get('/new', (req, res) => {
  res.render('new');
});

// Save new post
app.post('/new', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).send('Title and content required');
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'untitled';
  const filename = `${slug}.md`;
  const filePath = path.join(POSTS_DIR, filename);
  const final = `# ${title}\n\n${content}`;
  fs.writeFile(filePath, final, 'utf8', (err) => {
    if (err) return res.status(500).send('Error saving post');
    res.redirect('/');
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
