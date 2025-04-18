# URL Shortener with Hono

![Test](https://github.com/lil-shimon/hono-linker/actions/workflows/test.yml/badge.svg)
[![codecov](https://codecov.io/gh/lil-shimon/hono-linker/branch/main/graph/badge.svg)](https://codecov.io/gh/lil-shimon/hono-linker)

このプロジェクトは、HonoフレームワークとAWS Lambdaを使用したURL短縮サービスの学習用プロジェクトです。
特筆すべき点として、**すべてのコードはAIアシスタント（Claude）との対話のみで作成**されており、人の手による直接的なコード修正は一切行っていません。

## AI駆動開発の特徴

- **コード生成**: すべてのコードはAIアシスタントによって生成
- **エラー解決**: 発生したエラーもAIアシスタントとの対話で解決
- **テストファースト**: テストコードからスタートし、TDDを実践
- **段階的な実装**: 要件定義から実装まで、対話形式で段階的に開発

## 開発プロセス

1. **要件の提示**
   - 人間: URL短縮サービスを作りたい
   - AI: 必要な機能と実装手順を提案

2. **テストコードの作成**
   - 人間: テストコードが欲しい
   - AI: テストケースを提案し、実装

3. **エラー解決**
   - 人間: テストでエラーが出た
   - AI: エラーを分析し、修正案を提示

4. **実装とリファクタリング**
   - すべての実装をAIアシスタントとの対話で実現
   - コードの品質維持とリファクタリングも対話で実施

## 技術スタック

- [Hono](https://hono.dev/) - 軽量なWebフレームワーク
- [Bun](https://bun.sh/) - JavaScriptランタイム
- [Vitest](https://vitest.dev/) - テストフレームワーク
- [nanoid](https://github.com/ai/nanoid) - ユニークID生成

## テストカバレッジ

このプロジェクトでは、以下の項目のテストカバレッジを重視しています：

- **エンドポイント**: 各APIエンドポイントの動作確認
- **バリデーション**: 入力値の検証処理
- **エラーハンドリング**: エラー時の適切なレスポンス

テストを実行するには：

```bash
# 通常のテスト実行
bun test

# カバレッジレポートの生成
bun test:coverage
```

現在のカバレッジ状況は[Codecov](https://codecov.io/gh/lil-shimon/hono-linker)で確認できます。

## プロジェクト構造

```
.
├── .github/
│   ├── workflows/         # GitHub Actions設定
│   └── copilot-instructions.md  # Copilot設定
├── src/
│   ├── index.ts        # メインアプリケーション（AI生成）
│   └── index.test.ts   # テストコード（AI生成）
├── vitest.config.ts    # Vitestの設定（AI生成）
├── package.json
└── README.md
```

## 主な機能

- URLの短縮化
- 短縮URLからオリジナルURLへのリダイレクト
- 基本的なURLバリデーション

## APIエンドポイント

- `POST /shorten` - URLを短縮化
- `GET /:shortId` - 短縮URLからリダイレクト

## AI駆動開発のメリット

1. **一貫性の維持**
   - すべてのコードがAIアシスタントによって生成されることで、一貫したコーディングスタイルを維持

2. **学習効果**
   - AIとの対話を通じて、フレームワークやベストプラクティスを学習
   - エラー解決プロセスを通じて、デバッグスキルを向上

3. **ドキュメンテーション**
   - 実装の意図や理由が対話の中で明確に記録
   - コードの各部分の説明が詳細に残される

## 今後の展開

- DynamoDBとの連携
- アクセス統計機能
- カスタム短縮URL機能
- 有効期限設定機能

## 学習ポイント

このプロジェクトを通じて以下の点を学ぶことができます：

- Honoフレームワークの基本的な使い方
- テスト駆動開発の実践
- AWS Lambdaへのデプロイ
- AIアシスタントを活用した効率的な開発手法
