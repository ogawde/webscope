import { useState } from 'react';

export default function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function analyze() {
    setLoading(true);
    const response = await fetch(`/api/analyze?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Simple Web Analyzer</h1>
          <p className="text-slate-600">Analyze any website's SEO metadata and content</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex gap-3">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="flex-1 px-4 py-3 border border-slate-300 rounded-lg"
            />
            <button
              onClick={analyze}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg"
            >
              {loading ? 'Loading...' : 'Analyze'}
            </button>
          </div>
        </div>

        {result && (
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
            <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="text-sm text-slate-500 mb-1">Title</div>
                <div className="text-slate-900">{result.title}</div>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="text-sm text-slate-500 mb-1">Word Count</div>
                <div className="text-slate-900 text-xl">{result.wordCount}</div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="text-sm text-slate-500 mb-2">Meta Description</div>
              <div className="text-slate-700">{result.metaDescription}</div>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="text-sm text-slate-500 mb-3">H1 Headings</div>
              <ul className="space-y-2">
                {result.h1.map((heading: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>{heading}</span>
                  </li>
                ))}
              </ul>
            </div>

            <details className="mt-6">
              <summary className="cursor-pointer text-sm">View Raw JSON</summary>
              <pre className="mt-3 p-4 bg-slate-900 text-slate-100 rounded-lg overflow-x-auto text-sm">
                {JSON.stringify(result, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}
