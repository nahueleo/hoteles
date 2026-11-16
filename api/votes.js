// Vercel Serverless Function: likes compartidos + sugerencias (Upstash Redis via REST)
const URL_ENV = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || process.env.STORAGE_REST_API_URL || process.env.STORAGE_URL;
const TOKEN_ENV = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || process.env.STORAGE_REST_API_TOKEN || process.env.STORAGE_TOKEN;
const ALLOWED = new Set(["laghetto","windsor","peregrino","picanha","fratelli","granparrilla","toca","riobrasa","fogo","mocellin","bangalo"]);

async function cmd(arr) {
  const r = await fetch(URL_ENV, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN_ENV}`, "Content-Type": "application/json" },
    body: JSON.stringify(arr),
  });
  const j = await r.json();
  if (j.error) throw new Error(j.error);
  return j.result;
}

async function state() {
  const hall = (await cmd(["HGETALL", "votes"])) || [];
  const likes = {};
  for (let i = 0; i < hall.length; i += 2) likes[hall[i]] = Number(hall[i + 1]);
  const raw = (await cmd(["LRANGE", "custom", 0, -1])) || [];
  const custom = raw.map((s) => { try { return JSON.parse(s); } catch { return null; } }).filter(Boolean);
  return { likes, custom };
}

const clean = (s, max) => String(s || "").replace(/[<>]/g, "").trim().slice(0, max);

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (!URL_ENV || !TOKEN_ENV) return res.status(500).json({ error: "Falta el storage en el proyecto." });
  try {
    if (req.method === "GET") return res.status(200).json(await state());
    if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido" });
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    if (body.action === "like") {
      if (!ALLOWED.has(body.id)) return res.status(400).json({ error: "Opción inválida" });
      await cmd(["HINCRBY", "votes", body.id, 1]);
      return res.status(200).json(await state());
    }
    if (body.action === "add") {
      const name = clean(body.name, 60);
      const note = clean(body.note, 200);
      const link = clean(body.link, 300);
      if (!name) return res.status(400).json({ error: "Falta el nombre" });
      if (link && !/^https?:\/\//.test(link)) return res.status(400).json({ error: "El link debe empezar con https://" });
      const items = (await cmd(["LRANGE", "custom", 0, -1])) || [];
      if (items.length >= 50) return res.status(400).json({ error: "Ya hay demasiadas sugerencias" });
      await cmd(["RPUSH", "custom", JSON.stringify({ name, note, link, at: Date.now() })]);
      return res.status(200).json(await state());
    }
    return res.status(400).json({ error: "Acción inválida" });
  } catch (e) {
    return res.status(500).json({ error: "Error del servidor" });
  }
};
