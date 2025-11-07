import { NextRequest, NextResponse } from "next/server";
import todoStore from "@/lib/store";

type RouteContext = {
  params: Promise<{ id: string }>;
};

// GET single todo
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const todo = todoStore.getById(id);

    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(todo);
  } catch (error) {
    console.error("Error fetching todo:", error);
    return NextResponse.json(
      { error: "Failed to fetch todo" },
      { status: 500 }
    );
  }
}

// PATCH update todo
export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { title, description, completed } = body;

    const updateData: any = {};
    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description.trim();
    if (completed !== undefined) updateData.completed = completed;

    const todo = todoStore.update(id, updateData);

    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(todo);
  } catch (error) {
    console.error("Error updating todo:", error);
    return NextResponse.json(
      { error: "Failed to update todo" },
      { status: 500 }
    );
  }
}

// DELETE todo
export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const success = todoStore.delete(id);

    if (!success) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return NextResponse.json(
      { error: "Failed to delete todo" },
      { status: 500 }
    );
  }
}
