import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware for parsing JSON
app.use(express.json());

// Serve test-runner.html specifically
app.get('/test-runner.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'test-runner.html'));
});

// Serve dist directory if built
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

// Serve public directory and original assets (images, docs)
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/docs', express.static(path.join(__dirname, 'docs')));
app.use(express.static(__dirname, { extensions: ['html'] }));

// Mock API Endpoints for Spring Boot Simulation (DSY1104)
app.get('/api/health', (req, res) => {
  res.json({ status: 'UP', service: 'Distribuidora Gas El Volcán API Mock', timestamp: new Date() });
});

// Root fallback handler for SPA navigation (Express 5 compatible)
app.use((req, res, next) => {
  // If request has extension and was not found by static handlers, return 404
  if (path.extname(req.path)) {
    return next();
  }
  const indexPath = fs.existsSync(path.join(distPath, 'index.html'))
    ? path.join(distPath, 'index.html')
    : path.join(__dirname, 'index.html');
  res.sendFile(indexPath);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
