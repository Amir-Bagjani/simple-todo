"use client";

import { useState, useEffect, useTransition } from "react";
import { Todo, FilterType } from "@/types/todo";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import {
  getTodos,
  createTodo,
  toggleTodo,
  updateTodo,
  deleteTodo,
  clearCompleted,
} from "./actions/todos";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [loading, setLoading] = useState(true);
  const [, startTransition] = useTransition();

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const addTodo = (title: string, description: string) => {
    startTransition(async () => {
      const newTodo = await createTodo(title, description);
      setTodos((prev) => [newTodo, ...prev]);
    });
  };

  const handleToggle = (id: string) => {
    startTransition(async () => {
      const updated = await toggleTodo(id);
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    });
  };

  const handleEdit = (id: string, title: string, description: string) => {
    startTransition(async () => {
      const updated = await updateTodo(id, title, description);
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    });
  };

  const handleClearCompleted = () => {
    startTransition(async () => {
      await clearCompleted();
      setTodos((prev) => prev.filter((t) => !t.completed));
    });
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 sm:py-8 md:py-12 px-3 sm:px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            📝 Todo App
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            With SQLite Database - No signup needed!
          </p>
          <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Database: prisma/dev.db
          </div>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
          <TodoForm onAdd={addTodo} />
          <TodoList
            todos={todos}
            filter={filter}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onFilterChange={setFilter}
            onClearCompleted={handleClearCompleted}
          />
        </div>

        <div className="text-center mt-6 text-xs text-gray-600">
          <p>✅ Data saved to local SQLite database</p>
        </div>
      </div>
    </main>
  );
}
