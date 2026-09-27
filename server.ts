import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateNavratriPlan, generateOutfitWithGemini } from './src/lib/ai/gemini.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

// API endpoint: Generate Navratri Night Itinerary using server-side Gemini AI
app.post('/api/planner/generate', async (req: Request, res: Response) => {
  try {
    const rawInput = req.body;
    if (!rawInput || typeof rawInput !== 'object') {
      return res.status(400).json({ error: 'Missing planner input parameters' });
    }

    const plan = await generateNavratriPlan(rawInput);
    return res.json(plan);
  } catch (err: any) {
    console.error('[GarbaGo Server] /api/planner/generate error:', err);
    return res.status(500).json({ error: 'Failed to generate Navratri itinerary' });
  }
});

// API endpoint: Generate Outfit AI Recommendations using server-side Gemini AI
app.post('/api/outfit/generate', async (req: Request, res: Response) => {
  try {
    const outfit = await generateOutfitWithGemini(req.body || {});
    return res.json(outfit);
  } catch (err: any) {
    console.error('[GarbaGo Server] /api/outfit/generate error:', err);
    return res.status(500).json({ error: 'Failed to generate outfit recommendation' });
  }
});

// Configure Vite middleware in development or express.static in production
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[GarbaGo] Server listening on http://0.0.0.0:${PORT} (env: ${isProd ? 'prod' : 'dev'})`);
  });
}

startServer().catch((err) => {
  console.error('[GarbaGo] Failed to start server:', err);
  process.exit(1);
});
