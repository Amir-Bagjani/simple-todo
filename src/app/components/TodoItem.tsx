"use client";

import { Todo } from "@/types/todo";
import { useState } from "react";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, description: string) => void;
}

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
}: TodoItemProps) {
  const [showDelete, setShowDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSave = () => {
    if (editTitle.trim()) {
      onEdit(todo.id, editTitle.trim(), editDescription.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="p-3 sm:p-4 bg-blue-50 border-2 border-blue-300 rounded-lg">
        <div className="space-y-2">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Title"
            autoFocus
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
            placeholder="Description (optional)"
            rows={3}
          />
          <div className="flex gap-2 justify-end">
            <button
              onClick={handleCancel}
              className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-200 rounded-lg transition-colors touch-manipulation"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors touch-manipulation"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="p-3 sm:p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <div className="flex items-start gap-2 sm:gap-3">
        {/* Custom Checkbox */}
        <label className="flex items-start pt-0.5 cursor-pointer min-w-fit">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer accent-blue-500"
          />
        </label>

        {/* Todo Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className={`text-sm sm:text-base md:text-lg font-medium cursor-pointer select-none break-words ${
              todo.completed ? "line-through text-gray-400" : "text-gray-800"
            }`}
          >
            {todo.title}
          </div>

          {/* Description Preview/Full */}
          {todo.description && (
            <div
              onClick={() => setIsExpanded(!isExpanded)}
              className={`mt-1 text-xs sm:text-sm cursor-pointer select-none ${
                todo.completed ? "text-gray-300" : "text-gray-600"
              } ${isExpanded ? "" : "line-clamp-2"}`}
            >
              {todo.description}
            </div>
          )}

          {/* Expand/Collapse indicator */}
          {todo.description && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-1 text-xs text-blue-500 hover:text-blue-600 transition-colors"
            >
              {isExpanded ? "Show less" : "Show more"}
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div
          className={`flex gap-1 sm:gap-2 transition-opacity ${
            showDelete ? "opacity-100" : "opacity-100 sm:opacity-0"
          }`}
        >
          <button
            onClick={() => setIsEditing(true)}
            className="p-1.5 sm:p-2 text-blue-500 hover:bg-blue-50 active:bg-blue-100 rounded transition-colors touch-manipulation"
            aria-label="Edit todo"
            title="Edit"
          >
            <span className="text-sm sm:text-base">✏️</span>
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="p-1.5 sm:p-2 text-red-500 hover:bg-red-50 active:bg-red-100 rounded transition-colors touch-manipulation"
            aria-label="Delete todo"
            title="Delete"
          >
            <span className="text-sm sm:text-base">🗑️</span>
          </button>
        </div>
      </div>
    </div>
  );
}
