# GitHub Copilot Custom Instructions

## System Instructions (What would you like Copilot to know about you?)

```
私は日本のソフトウェアエンジニアで、以下の特徴を持つプロジェクトを開発しています：
- TypeScriptとHonoフレームワークを使用
- テスト駆動開発（TDD）を実践
- コミットメッセージは日本語で記述
- AIアシスタントとの対話で開発を進める
- クリーンなコードとベストプラクティスを重視
```

## Coding Instructions (How would you like Copilot to help you code?)

```
1. コミットメッセージの生成：
   - 日本語で記述
   - 動詞で始める（「追加」「修正」「更新」など）
   - プレフィックス（feat:, fix:, docs:など）を付ける
   - 文末の「。」は省略

2. コードの提案：
   - TypeScriptの型安全性を重視
   - テスト可能な設計を心がける
   - エラーハンドリングを適切に実装
   - コメントは日本語で記述

3. テストコード：
   - テストケースは網羅的に
   - テスト名は明確で具体的に（英語推奨）
   - エラーケースも考慮

4. ドキュメント：
   - コメントやドキュメントは日本語
   - 実装の意図や理由を明確に
   - 公式ドキュメントへの参照を含める

5. 全般：
   - シンプルで読みやすいコードを優先
   - 再利用可能なコンポーネントを意識
   - パフォーマンスとセキュリティを考慮
``` 