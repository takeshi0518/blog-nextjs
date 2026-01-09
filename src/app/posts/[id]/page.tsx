import { createSupabaseBrowserClient } from '@/app/lib/supabase/client';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import DeleteButton from '@/components/deleteButton';

type PostDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = await params;
  const supabase = await createSupabaseBrowserClient();
  const postId = Number(id);

  if (isNaN(postId)) notFound();

  const { data: post, error } = await supabase
    .from('posts')
    .select('id, title, content, created_at, updated_at')
    .eq('id', postId)
    .single();

  if (error || !post) {
    notFound();
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/posts"
          className="text-blue-600 hover:underline mb-4 inline-block"
        >
          ← 記事一覧に戻る
        </Link>

        <article className="mt-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

          <div className="flex gap-4 text-sm text-gray-500 mb-8">
            <span>
              作成: {new Date(post.created_at!).toLocaleDateString('ja-JP')}
            </span>
            <span>
              更新: {new Date(post.updated_at!).toLocaleDateString('ja-JP')}
            </span>
          </div>

          <div className="prose max-w-none">
            <p className="whitespace-pre-wrap">{post.content}</p>
          </div>

          <div className="mt-8 flex gap-4">
            <Link
              href={`/posts/${post.id}/edit`}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-50"
            >
              編集
            </Link>
            <DeleteButton postId={post.id} />
          </div>
        </article>
      </div>
    </main>
  );
}
