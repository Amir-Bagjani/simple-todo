import { getTodos } from "@/lib/data";
import { TodoClientView } from "./todo-client-view";

export default async function Home() {
  // Fetch data on the server
  const todos = await getTodos();

  return (
    <main>
      {/* Pass server-fetched data to the Client Component */}
      <TodoClientView initialTodos={todos} />
    </main>
  );
}