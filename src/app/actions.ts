"use server";

import { getTodos, saveTodos } from "@/lib/data";
import { Todo } from "@/types";
import { revalidatePath } from "next/cache";

// Action to add a new todo or update an existing one
export async function addOrEditTodo(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  if (!title || !title.trim()) {
    // Basic validation
    return { error: "Title is required." };
  }

  const todos = await getTodos();

  if (id) {
    // Editing an existing todo
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title, description } : todo
    );
    await saveTodos(updatedTodos);
  } else {
    // Adding a new todo
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      description,
      isDone: false,
    };
    await saveTodos([...todos, newTodo]);
  }

  // Refresh the page to show the changes
  revalidatePath("/");
}

// Action to toggle the 'isDone' status of a todo
export async function toggleTodo(id: string, isDone: boolean) {
  const todos = await getTodos();
  const updatedTodos = todos.map((todo) =>
    todo.id === id ? { ...todo, isDone: !isDone } : todo
  );
  await saveTodos(updatedTodos);
  revalidatePath("/");
}

// Action to delete a todo
export async function deleteTodo(id: string) {
  const todos = await getTodos();
  const updatedTodos = todos.filter((todo) => todo.id !== id);
  await saveTodos(updatedTodos);
  revalidatePath("/");
}
