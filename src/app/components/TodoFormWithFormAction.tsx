"use client";

import { useRef, useTransition } from "react";
import { createTodoAction } from "@/app/actions/todos";

export default function TodoFormWithFormAction({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const title = formData.get("title") as string;
      const description = formData.get("description") as string;

      if (title.trim()) {
        await createTodoAction(title, description);
        formRef.current?.reset();
        onSuccess();
      }
    });
  }

  return (
    <form ref={formRef} action={handleSubmit} className="mb-6 sm:mb-8">
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <input
            type="text"
            name="title"
            placeholder="Task title *"
            required
            disabled={isPending}
            className="flex-1 px-3 py-2.5 sm:px-4 sm:py-3 text-base sm:text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isPending}
            className="px-4 py-2.5 sm:px-6 sm:py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 active:bg-blue-700 transition-colors active:scale-95 transform touch-manipulation whitespace-nowrap disabled:opacity-50"
          >
            {isPending ? "Adding..." : "Add Task"}
          </button>
        </div>

        <textarea
          name="description"
          placeholder="Add a description (optional)"
          rows={3}
          disabled={isPending}
          className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-none disabled:opacity-50"
        />
      </div>
    </form>
  );
}
