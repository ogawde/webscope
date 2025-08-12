import axios from 'axios';
import * as cheerio from 'cheerio';

export interface AnalysisResult {
  status: 'ok';
  url: string;
  title: string;
  metaDescription: string;
  wordCount: number;
  h1: string[];
}

export async function analyzeUrl(url: string): Promise<AnalysisResult> {
  const resp = await axios.get(url);
  const $ = cheerio.load(resp.data);

  const title = ($('title').first().text() || '').trim();
  const metaDescription = ($('meta[name="description"]').attr('content') || '').trim();

  $('script, style, noscript').remove();
  const bodyText = $('body').text().replace(/\s+/g, ' ').trim();
  const wordCount = bodyText ? bodyText.split(' ').filter(Boolean).length : 0;
  const h1 = $('h1').toArray().map(el => $(el).text().trim()).filter(Boolean);

  return { status: 'ok', url, title, metaDescription, wordCount, h1 };
}

