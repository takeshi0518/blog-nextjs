import { createSupabaseServerClient } from '@/app/lib/supabase/server';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';

type EditPostPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  const postId = Number(id);
  const supabase = await createSupabaseServerClient();

  if (isNaN(postId)) notFound();

  const { data: post, error } = await supabase
    .from('posts')
    .select('id, title, content')
    .eq('id', postId)
    .single();

  if (error || !post) notFound();

  async function updatePost(formData: FormData) {
    'use server';

    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    if (!title || !content) return;

    const supabase = await createSupabaseServerClient();

    const { error } = await supabase
      .from('posts')
      .update({ title, content })
      .eq('id', postId);

    if (error) {
      console.error('Error updating post:', error);
      return;
    }

    redirect(`/posts/${postId}`);
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <Link
          href={`/posts/${post.id}`}
          className="text-blue-600 hover:underline mb-4 inline-block"
        >
          ← 記事詳細に戻る
        </Link>

        <h1 className="text-4xl font-bold mt-8 mb-8">記事編集</h1>

        <form action={updatePost} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              タイトル
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              defaultValue={post.title}
              className="w-full px-4 py-2 border rounded-lg focus-outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-2">
              本文
            </label>
            <textarea
              name="content"
              id="content"
              required
              rows={10}
              defaultValue={post.content}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              更新
            </button>
            <Link
              href={`/posts/${post.id}`}
              className="px-6 py-2 border rounded hover:bg-gray-100"
            >
              キャンセル
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
