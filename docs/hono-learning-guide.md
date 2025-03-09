# Honoフレームワーク学習ガイド

このガイドは、URL短縮サービスの実装を通じてHonoフレームワークの基本を学ぶためのものです。

## 1. アプリケーションの基本構造

### Honoインスタンスの作成
[公式ドキュメント](https://hono.dev/getting-started/basic)

このプロジェクトの実装: [src/index.ts](../src/index.ts#L1-L5) - アプリケーションのエントリーポイント
```typescript
import { Hono } from 'hono'

const app = new Hono()

export default app
```

Honoは軽量なWebフレームワークで、シンプルなインスタンス作成から始まります。

### ルーティング
[公式ドキュメント](https://hono.dev/api/routing)

このプロジェクトの実装: [src/index.ts](../src/index.ts#L10-L25) - POSTとGETエンドポイントの定義
```typescript
// POSTリクエストのハンドリング
app.post('/shorten', async (c) => {
  // ハンドラーの実装
})

// 動的ルーティング
app.get('/:shortId', async (c) => {
  const shortId = c.req.param('shortId')
  // パラメータの取得と処理
})
```

- `app.post()`: POSTリクエストを処理
- `app.get()`: GETリクエストを処理
- `:shortId`: URLパラメータの定義

## 2. リクエスト処理

### JSONリクエストの処理
[公式ドキュメント](https://hono.dev/api/request#json)

このプロジェクトの実装: [src/index.ts](../src/index.ts#L12) - POSTハンドラー内のリクエストボディ処理
```typescript
const { url } = await c.req.json()
```

- `c.req.json()`: リクエストボディをJSONとしてパース
- 非同期処理として実装

### URLパラメータの取得
[公式ドキュメント](https://hono.dev/api/routing#url-parameters)

このプロジェクトの実装: [src/index.ts](../src/index.ts#L42) - GETハンドラー内のパラメータ取得
```typescript
const shortId = c.req.param('shortId')
```

動的ルーティングで定義したパラメータを取得できます。

## 3. レスポンス生成

### JSONレスポンス
[公式ドキュメント](https://hono.dev/api/context#json)

このプロジェクトの実装: [src/index.ts](../src/index.ts#L24-L30) - 短縮URL作成時のレスポンス
```typescript
return c.json({ 
  shortId,
  shortUrl,
  originalUrl: url 
}, 201)
```

- `c.json()`: JSONレスポンスを返す
- 第二引数でステータスコードを指定可能

### リダイレクト
[公式ドキュメント](https://hono.dev/api/context#redirect)

このプロジェクトの実装: [src/index.ts](../src/index.ts#L48) - 短縮URLアクセス時のリダイレクト処理
```typescript
return c.redirect(originalUrl)
```

指定したURLへのリダイレクトレスポンスを生成します。

## 4. エラーハンドリング
[公式ドキュメント](https://hono.dev/api/context#status)

このプロジェクトの実装: [src/index.ts](../src/index.ts#L15-L18,L44-L46) - バリデーションとエラーレスポンス
```typescript
if (!url || !isValidUrl(url)) {
  return c.json({ error: 'Invalid URL' }, 400)
}

if (!originalUrl) {
  return c.json({ error: 'URL not found' }, 404)
}
```

- ステータスコードとエラーメッセージを組み合わせて返却
- 適切なHTTPステータスコードの使用

## 5. テスト
[公式ドキュメント](https://hono.dev/guides/testing)

このプロジェクトの実装: [src/index.test.ts](../src/index.test.ts#L11-L25) - 短縮URL作成のテストケース
```typescript
describe('URL Shortener API', () => {
  it('should create a short URL', async () => {
    const res = await app.request('/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: 'https://example.com',
      }),
    })

    expect(res.status).toBe(201)
  })
})
```

- `app.request()`: テストリクエストの送信
- レスポンスの検証
- 非同期テストの実装

## 6. ベストプラクティス

### バリデーション
このプロジェクトの実装: [src/index.ts](../src/index.ts#L52-L60) - URLバリデーション関数
```typescript
function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}
```

- 入力値の検証
- エラーハンドリングの実装

### 型安全性
[公式ドキュメント](https://hono.dev/guides/typescript)

TypeScriptとの相性が良く、型安全な実装が可能です。

## 7. デプロイ
[公式ドキュメント](https://hono.dev/getting-started/aws-lambda)

このプロジェクトの実装: [src/index.ts](../src/index.ts#L62-L64) - Lambda用ハンドラー
```typescript
import { handle } from 'hono/aws-lambda'

export const handler = handle(app)
```

## 学習のステップアップ

1. 基本的なルーティングから開始
2. リクエスト/レスポンスの処理を理解
3. エラーハンドリングの実装
4. テストの作成
5. 実践的な機能の追加

## 参考リソース

- [Hono公式ドキュメント](https://hono.dev/)
- [Honoのサンプルプロジェクト](https://github.com/honojs/examples)
- [Hono GitHub](https://github.com/honojs/hono) 