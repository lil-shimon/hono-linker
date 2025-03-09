import { describe, it, expect, beforeAll, afterAll } from "vitest";
import app from "./index";
import { serve } from "@hono/node-server";

describe("URL Shortener API", () => {
  const server = serve(app);
  let shortId: string;

  // テストスイート開始前にサーバーを起動
  beforeAll(() => {
    server.listen(0); // ランダムな空きポートを使用
  });

  // テストスイート終了後にサーバーを停止
  afterAll(() => {
    server.close();
  });

  // 正常系のテスト
  describe("POST /shorten", () => {
    it("should create a short URL", async () => {
      const res = await app.request("/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: "https://example.com",
        }),
      });

      expect(res.status).toBe(201);
      const data = await res.json();
      expect(data).toHaveProperty("shortId");
      expect(data).toHaveProperty("shortUrl");
      expect(data).toHaveProperty("originalUrl", "https://example.com");

      // 後続のテストのために shortId を保存
      shortId = data.shortId;
    });
  });

  // エラー系のテスト
  describe("POST /shorten validation", () => {
    it("should reject invalid URLs", async () => {
      const res = await app.request("/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: "not-a-url",
        }),
      });

      expect(res.status).toBe(400);
      const data = await res.json();
      expect(data).toHaveProperty("error", "Invalid URL");
    });

    it("should reject requests without URL", async () => {
      const res = await app.request("/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      expect(res.status).toBe(400);
      const data = await res.json();
      expect(data).toHaveProperty("error", "Invalid URL");
    });
  });

  // リダイレクトのテスト
  describe("GET /:shortId", () => {
    it("should redirect to original URL", async () => {
      // まず短縮URLを作成
      const createRes = await app.request("/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: "https://example.com",
        }),
      });
      const { shortId } = await createRes.json();

      // 作成した短縮URLでリダイレクトをテスト
      const res = await app.request(`/${shortId}`, {
        method: "GET",
        redirect: "manual", // リダイレクトを自動で追従しない
      });

      expect(res.status).toBe(302); // リダイレクトステータスコード
      expect(res.headers.get("Location")).toBe("https://example.com");
    });

    it("should return 404 for non-existent shortId", async () => {
      const res = await app.request("/nonexistent", {
        method: "GET",
      });

      expect(res.status).toBe(404);
      const data = await res.json();
      expect(data).toHaveProperty("error", "URL not found");
    });
  });
});
