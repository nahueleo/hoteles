// Vercel Serverless Function: likes compartidos + sugerencias (Upstash Redis via REST)
const URL_ENV = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || process.env.STORAGE_REST_API_URL || process.env.STORAGE_URL;
const TOKEN_ENV = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || process.env.STORAGE_REST_API_TOKEN || process.env.STORAGE_TOKEN;
const ALLOWED = new Set(["laghetto","windsor","peregrino","picanha","fratelli","granparrilla","toca","riobrasa","fogo","mocellin","bangalo","radisson"]);

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

const ACT_ALLOWED = new Set(["d25-barra","d25-prainha","d26-cristo","d27-pao","d28-buzios","d28-paraty","d29-ilha"]);
const FOOD_ALLOWED = new Set(["laghetto", "windsor", "radisson", "peregrino", "mocellin", "riobrasa", "picanha", "fratelli", "granparrilla", "toca", "fogo", "bangalo", "f-hotel-almuerzo", "f-gran-especial"]);
const isAct = (id) => ACT_ALLOWED.has(id) || FOOD_ALLOWED.has(id) || /^u-[a-z0-9]{6,24}$/.test(String(id)) || /^p-[a-z]{4,12}$/.test(String(id));

const TOKEN_ADMIN = process.env.ADMIN_TOKEN;

async function getContent() {
  const raw = await cmd(["GET", "content"]);
  if (!raw) return {};
  try { return JSON.parse(raw); } catch { return {}; }
}

async function state() {
  const hall = (await cmd(["HGETALL", "votes"])) || [];
  const likes = {};
  for (let i = 0; i < hall.length; i += 2) likes[hall[i]] = Number(hall[i + 1]);
  const raw = (await cmd(["LRANGE", "custom", 0, -1])) || [];
  const custom = raw.map((s) => { try { return JSON.parse(s); } catch { return null; } }).filter(Boolean);
  const ah = (await cmd(["HGETALL", "actvotes"])) || [];
  const actlikes = {};
  for (let i = 0; i < ah.length; i += 2) actlikes[ah[i]] = Number(ah[i + 1]);
  const dh = (await cmd(["HGETALL", "dayvotes"])) || [];
  const dayvotes = {};
  for (let i = 0; i < dh.length; i += 2) dayvotes[dh[i]] = Number(dh[i + 1]);
  const content = await getContent();
  const ac = (await cmd(["LRANGE", "actcustom", 0, -1])) || [];
  const actcustom = ac.map((x) => { try { return JSON.parse(x); } catch { return null; } }).filter(Boolean);
  return { likes, custom, content, actlikes, dayvotes, actcustom };
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
    if (body.action === "actlike") {
      if (!isAct(body.id)) return res.status(400).json({ error: "Actividad inválida" });
      await cmd(["HINCRBY", "actvotes", body.id, 1]);
      return res.status(200).json(await state());
    }
    if (body.action === "actadd") {
      const name = clean(body.name, 80);
      if (!name) return res.status(400).json({ error: "Falta el nombre" });
      const cat = ["playa", "atraccion", "excursion"].includes(body.cat) ? body.cat : "atraccion";
      const day = [25, 26, 27, 28, 29].includes(Number(body.day)) ? Number(body.day) : 0;
      const item = { id: "u-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), name, cat, day,
        precio: clean(body.precio, 120), rec: clean(body.rec, 120), que: clean(body.que, 300), link: clean(body.link, 300), at: Date.now() };
      if (item.link && !/^https?:\/\//.test(item.link)) return res.status(400).json({ error: "El link debe empezar con https://" });
      const items = (await cmd(["LRANGE", "actcustom", 0, -1])) || [];
      if (items.length >= 60) return res.status(400).json({ error: "Ya hay demasiadas sugerencias" });
      await cmd(["RPUSH", "actcustom", JSON.stringify(item)]);
      return res.status(200).json(await state());
    }
    if (body.action === "dayvote") {
      const day = Number(body.day);
      if (!isAct(body.id) || ![25, 26, 27, 28, 29].includes(day)) return res.status(400).json({ error: "Opción inválida" });
      await cmd(["HINCRBY", "dayvotes", body.id + "|" + day, 1]);
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
    if (body.action === "saveContent") {
      if (!TOKEN_ADMIN) return res.status(500).json({ error: "Falta configurar ADMIN_TOKEN en Vercel." });
      if (body.token !== TOKEN_ADMIN) return res.status(401).json({ error: "Clave incorrecta" });
      const incoming = body.content && typeof body.content === "object" ? body.content : {};
      const clean2 = { general: clean(incoming.general, 4000) };
      for (const id of Object.keys(incoming)) {
        if (id === "general") continue;
        if (!ALLOWED.has(id)) continue;
        clean2[id] = { price: clean(incoming[id].price, 300), note: clean(incoming[id].note, 600) };
      }
      await cmd(["SET", "content", JSON.stringify(clean2)]);
      return res.status(200).json(await state());
    }
    return res.status(400).json({ error: "Acción inválida" });
  } catch (e) {
    return res.status(500).json({ error: "Error del servidor" });
  }
};
