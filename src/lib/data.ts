import fs from "fs/promises";
import path from "path";
import { Todo } from "@/types";

// Path to our JSON file database
const dbPath = path.resolve(process.cwd(), "todos.json");

export async function getTodos(): Promise<Todo[]> {
  try {
    const data = await fs.readFile(dbPath, "utf-8");
    return JSON.parse(data) as Todo[];
  } catch (error) {
    // If the file doesn't exist, return an empty array
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      await saveTodos([]); // Create the file if it doesn't exist
      return [];
    }
    throw error;
  }
}

export async function saveTodos(todos: Todo[]): Promise<void> {
  await fs.writeFile(dbPath, JSON.stringify(todos, null, 2), "utf-8");
}
