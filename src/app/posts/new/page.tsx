import { createSupabaseServerClient } from '@/app/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { PostFormField } from '@/components/postFormField';
import { PostFormActions } from '@/components/postFormActions';

export default function NewPostPage() {
  async function createPost(formData: FormData) {
    'use server';

    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    if (!title || !content) return;

    const supabase = await createSupabaseServerClient();

    const { error } = await supabase.from('posts').insert({ title, content });

    if (error) {
      console.error('Error creating post:', error);
      return;
    }

    redirect('/posts');
  }
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/posts"
          className="text-blue-600 hover:underline mb-4 inline-block"
        >
          ← 記事一覧に戻る
        </Link>

        <h1 className="text-4xl font-bold mt-8 mb-8">新規記事作成</h1>

        <form action={createPost} className="space-y-6">
          <PostFormField />

          <PostFormActions submitLabel="作成" cancelHref="/posts" />
        </form>
      </div>
    </main>
  );
}
