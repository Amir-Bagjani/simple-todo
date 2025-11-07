"use client";

import { Todo, FilterType } from "@/types/todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  filter: FilterType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, description: string) => void;
  onFilterChange: (filter: FilterType) => void;
  onClearCompleted: () => void;
}

export default function TodoList({
  todos,
  filter,
  onToggle,
  onDelete,
  onEdit,
  onFilterChange,
  onClearCompleted,
}: TodoListProps) {
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div>
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
        {(["all", "active", "completed"] as FilterType[]).map((f) => (
          <button
            key={f}
            onClick={() => onFilterChange(f)}
            className={`flex-1 sm:flex-none px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium capitalize transition-colors text-sm sm:text-base touch-manipulation ${
              filter === f
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300"
            }`}
          >
            {f}
            <span className="ml-1 text-xs opacity-75">
              (
              {f === "all"
                ? todos.length
                : f === "active"
                ? activeCount
                : completedCount}
              )
            </span>
          </button>
        ))}
      </div>

      {/* Todo Items */}
      <div className="space-y-2 sm:space-y-3 max-h-[calc(100vh-400px)] sm:max-h-[500px] overflow-y-auto pr-1">
        {filteredTodos.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">
              {filter === "completed"
                ? "✅"
                : filter === "active"
                ? "📝"
                : "📋"}
            </div>
            <p className="text-gray-400 text-sm sm:text-base">
              {filter === "completed"
                ? "No completed tasks yet"
                : filter === "active"
                ? "No active tasks"
                : "No tasks yet. Add one above!"}
            </p>
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))
        )}
      </div>

      {/* Footer Stats */}
      {todos.length > 0 && (
        <div className="mt-4 sm:mt-6 pt-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-sm sm:text-base text-gray-500">
              <span className="font-semibold text-gray-700">{activeCount}</span>{" "}
              {activeCount === 1 ? "item" : "items"} left
            </div>

            {completedCount > 0 && (
              <button
                onClick={onClearCompleted}
                className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-gray-600 hover:text-red-500 hover:bg-red-50 rounded transition-colors touch-manipulation"
              >
                Clear completed ({completedCount})
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
