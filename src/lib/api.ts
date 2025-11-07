import { Todo } from "@/types/todo";

const API_BASE = "/api/todos";

export async function fetchTodos(): Promise<Todo[]> {
  const response = await fetch(API_BASE, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }

  return response.json();
}

export async function createTodo(
  title: string,
  description: string
): Promise<Todo> {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  });

  if (!response.ok) {
    throw new Error("Failed to create todo");
  }

  return response.json();
}

export async function updateTodo(
  id: string,
  data: Partial<Pick<Todo, "title" | "description" | "completed">>
): Promise<Todo> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update todo");
  }

  return response.json();
}

export async function deleteTodo(id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }
}

export async function clearCompletedTodos(): Promise<number> {
  const response = await fetch(API_BASE, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to clear completed todos");
  }

  const data = await response.json();
  return data.count;
}
