export interface GeneratedArticle {
  title: string;
  category: string;
  categorySlug: 'guides' | 'neighborhoods' | 'legal' | 'market';
  readTime: string;
  excerpt: string;
  tags: string;
  content: string;
}

const SYSTEM_INSTRUCTION = `You are a seasoned Abuja real estate consultant, property journalist, and legal advisor writing for RentABJ Homes (rentabj.com), Abuja's premier rental agency.
Your task is to write detailed, highly informative, realistic, and engaging rental guide articles specifically tailored to the Abuja property market in Nigeria.
Key local context to include where relevant:
- Specific Abuja districts (Maitama, Guzape, Jahi, Katampe, Gwarinpa, Karsana, Lifecamp, Wuse 2, Dawaki, Apo, Central Business District).
- Realistic naira rental ranges and fee structures (legal fees 5-10%, agency commission 10%, caution deposit, estate service charges).
- Real infrastructure realities (AEDC pre-paid meters, central estate generators and diesel contributions, borehole water, security outposts).
- Actionable tenant tips and inspection checklists.

You must respond ONLY with a valid JSON object matching this schema:
{
  "title": "Engaging, SEO-optimized title",
  "category": "Renting Guide" | "Neighborhoods" | "Tenant Advisory" | "Market Trends",
  "categorySlug": "guides" | "neighborhoods" | "legal" | "market",
  "readTime": "e.g. 4 min read",
  "excerpt": "A concise 2-sentence summary of the article for social media preview and Google search",
  "tags": "comma-separated relevant keywords",
  "content": "Rich HTML content using <h3>, <p>, <ul>, <li>, <strong>, <blockquote> tags. Minimum 4-6 substantial sections with practical guidance."
}`;

export async function generateBlogArticle(
  topicOrPrompt: string,
  apiKey: string
): Promise<GeneratedArticle> {
  if (!apiKey || !apiKey.trim()) {
    throw new Error('Google Gemini API Key is required. Please provide your API key.');
  }

  const cleanKey = apiKey.trim();

  // Try gemini-3.6-flash first as requested by Gemini API, with robust fallbacks
  const models = [
    'gemini-3.6-flash',
    'gemini-3.8-flash',
    'gemini-3.7-flash',
    'gemini-3-flash-preview',
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-1.5-flash',
  ];
  let lastError: any = null;

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${cleanKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `${SYSTEM_INSTRUCTION}\n\nWrite an in-depth article on the following topic or request:\n"${topicOrPrompt}"`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            responseMimeType: 'application/json',
          },
        }),
      });

      if (!res.ok) {
        const errorJson = await res.json().catch(() => ({}));
        const errMsg = errorJson?.error?.message || `API error ${res.status}`;
        throw new Error(errMsg);
      }

      const data = await res.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!rawText) {
        throw new Error('Empty response received from Gemini AI');
      }

      // Parse JSON from text (strip any accidental markdown block wrappers if present)
      let cleaned = rawText.trim();
      if (cleaned.startsWith('```json')) {
        cleaned = cleaned.replace(/^```json/, '').replace(/```$/, '').trim();
      } else if (cleaned.startsWith('```')) {
        cleaned = cleaned.replace(/^```/, '').replace(/```$/, '').trim();
      }

      const parsed: GeneratedArticle = JSON.parse(cleaned);

      // Validate required fields
      if (!parsed.title || !parsed.content) {
        throw new Error('Incomplete article generated. Missing title or content.');
      }

      return {
        title: parsed.title,
        category: parsed.category || 'Renting Guide',
        categorySlug: parsed.categorySlug || 'guides',
        readTime: parsed.readTime || '4 min read',
        excerpt: parsed.excerpt || '',
        tags: parsed.tags || 'abuja rentals real estate',
        content: parsed.content,
      };
    } catch (err: any) {
      lastError = err;
      const msg = (err?.message || '').toLowerCase();
      // If error is about model availability, retirement, unsupported, or 404, loop to next fallback model
      if (
        msg.includes('no longer available') ||
        msg.includes('not available') ||
        msg.includes('not found') ||
        msg.includes('unsupported') ||
        msg.includes('deprecated') ||
        msg.includes('404')
      ) {
        console.warn(`[Gemini AI] Model ${model} unavailable, trying next fallback...`, err.message);
        continue;
      }
      // Otherwise throw actual error (e.g. invalid API key)
      throw err;
    }
  }

  throw lastError || new Error('Failed to generate article with Gemini AI');
}
