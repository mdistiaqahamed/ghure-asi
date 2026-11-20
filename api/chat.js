export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const allowed = ["gemini-flash-lite-latest", "gemini-flash-latest"];
  const model = allowed.includes(req.query.model)
    ? req.query.model
    : "gemini-flash-lite-latest";

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_KEY}`;

  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req.body),
  });

  const data = await r.json().catch(() => ({}));
  res.status(r.status).json(data);
}