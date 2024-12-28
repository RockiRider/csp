import { createServer as createViteServer } from 'vite';
import express from 'express';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto'; // For generating nonce

async function createServer() {
  const app = express();

  const vite = await createViteServer({
    server: { middlewareMode: true }, // Enable middleware mode
    appType: 'custom', // Specify that this is not a standard Vite SPA but a custom server
  });

  app.use(vite.middlewares);

  app.get('*', async (req, res) => {
    const url = req.originalUrl;

    try {
      // Read the index.html file from the root directory
      const indexFilePath = path.resolve(__dirname, 'index.html');
      let template = fs.readFileSync(indexFilePath, 'utf-8');

      // Transform the HTML using Vite's built-in transformations
      template = await vite.transformIndexHtml(url, template);

      // Generate a nonce for CSP
      const nonce = crypto.randomBytes(16).toString('base64');

      // Replace the placeholder with the nonce
      template = template.replace(/%NONCE_PLACEHOLDER%/g, nonce);

      // Set the CSP header
      res.setHeader('Content-Security-Policy', `script-src 'self' 'nonce-${nonce}'`);
      res.status(200).send(template);
    } catch (e) {
      const err = e as Error
      vite.ssrFixStacktrace(err);
      res.status(500).end(err.stack);
    }
  });

  app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
  });
}

createServer();