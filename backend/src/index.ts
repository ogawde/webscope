import express from 'express';
import dotenv from 'dotenv';
import { analyzeUrl } from './analyzer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/health', (_, res) => res.json({ status: 'ok', ts: new Date().toISOString() }));

app.get('/api/analyze', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const url = String(req.query.url);
  const result = await analyzeUrl(url);
  res.json(result);
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
