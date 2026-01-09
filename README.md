# Blog Next.js

MVC アーキテクチャと Next.js の比較検証のために作成したブログアプリケーション

## 概要

このプロジェクトは、技術記事「MVC から Next.js へ - 同じブログアプリを作り直して分かった、技術選択の理由」のために作成しました。

従来の MVC アーキテクチャ([blog-mvc](https://github.com/takeshi0518/blog-mvc))と同じ機能を、Next.js で実装し比較検証しています。

## 技術スタック

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS

## 実装機能

- 記事の CRUD 操作
  - 作成 (Server Actions)
  - 一覧表示 (Server Component)
  - 詳細表示 (Dynamic Route)
  - 編集 (Server Actions)
  - 削除 (Client Component)

## セットアップ

### 1. リポジトリをクローン

```bash
$ git clone https://github.com/takeshi0518/blog-nextjs.git
$ cd blog-nextjs
```

### 2. 依存関係をインストール

```bash
$ npm install
```

### 3. Supabase ローカル環境を起動

```bash
$ supabase start
```

### 4. 環境変数を設定

`.env.local` ファイルを作成:

```env
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 5. 開発サーバーを起動

```bash
$ npm run dev
```

ブラウザで http://localhost:3000 を開く
