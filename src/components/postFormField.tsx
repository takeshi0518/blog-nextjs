type PostFormFieldProps = {
  defaultValues?: {
    title?: string;
    content?: string;
  };
};

export function PostFormField({ defaultValues }: PostFormFieldProps) {
  return (
    <>
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          タイトル
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          defaultValue={defaultValues?.title}
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
          defaultValue={defaultValues?.content}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
        />
      </div>
    </>
  );
}
