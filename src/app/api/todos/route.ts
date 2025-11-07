import { NextRequest, NextResponse } from "next/server";
import todoStore from "@/lib/store";

// GET all todos
export async function GET() {
  try {
    const todos = todoStore.getAll();
    return NextResponse.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}

// POST create new todo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description } = body;

    if (!title || title.trim() === "") {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const todo = todoStore.create(title.trim(), description?.trim() || "");

    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    console.error("Error creating todo:", error);
    return NextResponse.json(
      { error: "Failed to create todo" },
      { status: 500 }
    );
  }
}

// DELETE all completed todos
export async function DELETE() {
  try {
    const count = todoStore.clearCompleted();
    return NextResponse.json({
      message: `Deleted ${count} completed todo(s)`,
      count,
    });
  } catch (error) {
    console.error("Error clearing completed todos:", error);
    return NextResponse.json(
      { error: "Failed to clear completed todos" },
      { status: 500 }
    );
  }
}
