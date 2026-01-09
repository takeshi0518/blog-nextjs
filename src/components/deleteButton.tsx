'use client';

import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/app/lib/supabase/client';
import { useState } from 'react';

type DeleteButtonProps = {
  postId: number;
};

export default function DeleteButton({ postId }: DeleteButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm('本当に削除しますか？')) return;

    setIsDeleting(true);

    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.from('posts').delete().eq('id', postId);

    if (error) {
      console.error('Error deleting post:', error);
      alert('削除に失敗しました');
      setIsDeleting(false);
      return;
    }

    router.push('/posts');
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 desabled:opacity-50"
    >
      {isDeleting ? '削除中...' : '削除'}
    </button>
  );
}
