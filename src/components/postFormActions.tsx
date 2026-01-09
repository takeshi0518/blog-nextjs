import Link from 'next/link';

type PostFormActionsProps = {
  submitLabel: string;
  cancelHref: string;
};

export function PostFormActions({
  submitLabel,
  cancelHref,
}: PostFormActionsProps) {
  return (
    <div className="flex gap-4">
      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {submitLabel}
      </button>
      <Link
        href={cancelHref}
        className="px-6 py-2 border rounded hover:bg-gray-100"
      >
        キャンセル
      </Link>
    </div>
  );
}
