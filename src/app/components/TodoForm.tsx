"use client";

import { useState, FormEvent } from "react";

interface TodoFormProps {
  onAdd: (title: string, description: string) => void;
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showDescription, setShowDescription] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim(), description.trim());
      setTitle("");
      setDescription("");
      setShowDescription(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 sm:mb-8">
      <div className="space-y-3">
        {/* Title Input */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title *"
            className="flex-1 px-3 py-2.5 sm:px-4 sm:py-3 text-base sm:text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            required
          />
          <button
            type="submit"
            className="px-4 py-2.5 sm:px-6 sm:py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 active:bg-blue-700 transition-colors active:scale-95 transform touch-manipulation whitespace-nowrap"
          >
            Add Task
          </button>
        </div>

        {/* Description Toggle Button */}
        <button
          type="button"
          onClick={() => setShowDescription(!showDescription)}
          className="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1 transition-colors"
        >
          <span>{showDescription ? "▼" : "▶"}</span>
          <span>{showDescription ? "Hide" : "Add"} description</span>
        </button>

        {/* Description Textarea */}
        {showDescription && (
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description (optional)"
            rows={3}
            className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-none"
          />
        )}
      </div>
    </form>
  );
}
