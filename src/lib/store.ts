import { Todo } from "@/types/todo";

// In-memory storage
class TodoStore {
  private todos: Map<string, Todo> = new Map();

  getAll(): Todo[] {
    return Array.from(this.todos.values()).sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  getById(id: string): Todo | undefined {
    return this.todos.get(id);
  }

  create(title: string, description: string): Todo {
    const todo: Todo = {
      id: crypto.randomUUID(),
      title,
      description,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.todos.set(todo.id, todo);
    return todo;
  }

  update(
    id: string,
    data: Partial<Omit<Todo, "id" | "createdAt">>
  ): Todo | null {
    const todo = this.todos.get(id);
    if (!todo) return null;

    const updated: Todo = {
      ...todo,
      ...data,
      updatedAt: new Date().toISOString(),
    };
    this.todos.set(id, updated);
    return updated;
  }

  delete(id: string): boolean {
    return this.todos.delete(id);
  }

  clearCompleted(): number {
    const completedIds = Array.from(this.todos.values())
      .filter((todo) => todo.completed)
      .map((todo) => todo.id);

    completedIds.forEach((id) => this.todos.delete(id));
    return completedIds.length;
  }

  // Initialize with sample data
  init() {
    if (this.todos.size === 0) {
      this.create(
        "Welcome to your Todo App! 👋",
        "This is stored in server memory. Data will persist as long as the server is running."
      );
      this.create(
        "Try adding a new task",
        'Click the "Add Task" button above to create your own todos'
      );
      const completedId = crypto.randomUUID();
      this.todos.set(completedId, {
        id: completedId,
        title: "Mark tasks as complete",
        description: "Click the checkbox to mark a task as done",
        completed: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  }
}

// Singleton instance
const todoStore = new TodoStore();
todoStore.init();

export default todoStore;
