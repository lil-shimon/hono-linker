import { Hono } from 'hono'
import { nanoid } from "nanoid";

// 開発用の一時的なインメモリストレージ
// 後でDynamoDBに置き換えます
const urlMapping = new Map<string, string>();

const app = new Hono();

// URLを短縮するエンドポイント
app.post("/shorten", async (c) => {
  try {
    const { url } = await c.req.json();

    // 基本的なURL検証
    if (!url || !isValidUrl(url)) {
      return c.json({ error: "Invalid URL" }, 400);
    }

    // 短いIDを生成（後でDynamoDBで一意性を確保する必要があります）
    const shortId = nanoid(8);

    // URLを保存
    urlMapping.set(shortId, url);

    // レスポンスを返す
    const shortUrl = `${c.req.url}/${shortId}`;
    return c.json(
      {
        originalUrl: url,
        shortUrl,
        shortId,
      },
      201
    );
  } catch (error) {
    return c.json({ error: "Invalid request" }, 400);
  }
});

// 短縮URLからリダイレクトするエンドポイント
app.get("/:shortId", async (c) => {
  const shortId = c.req.param("shortId");
  const originalUrl = urlMapping.get(shortId);

  if (!originalUrl) {
    return c.json({ error: "URL not found" }, 404);
  }

  return c.redirect(originalUrl);
});

// URL検証用のヘルパー関数
function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export default app
