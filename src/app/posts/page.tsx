import { createSupabaseServerClient } from '../lib/supabase/server';
import Link from 'next/link';

export default async function PostsPage() {
  const supabase = await createSupabaseServerClient();

  const { data: posts, error } = await supabase
    .from('posts')
    .select('id , title, content, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    return <div>エラーが発生しました: {error.message}</div>;
  }

  return (
    <main className="min-h-scree p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">記事一覧</h1>
          <Link
            href="/posts/new"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            新規作成
          </Link>
        </div>
      </div>

      {posts && posts.length === 0 ? (
        <p className="text-gray-500">記事がありません</p>
      ) : (
        <div className="space-y-4">
          {posts?.map((post) => (
            <article
              key={post.id}
              className="p-6 border rounded-lg hover:shadow-lg transition"
            >
              <Link href={`/posts/${post.id}`}>
                <h2 className="text-2xl font-bold mb-2 hover:text-blue-600">
                  {post.title}
                </h2>
              </Link>
              <p className="text-gray-600 mb-4">
                {post.content.substring(0, 100)}...
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {new Date(post.created_at).toLocaleDateString('ja-JP')}
                </span>
                <Link
                  href={`/posts/${post.id}`}
                  className="text-blue-600 hover:underline"
                >
                  詳細を見る
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
