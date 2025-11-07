"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getTodos() {
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: "desc" },
  });
  return todos.map((todo) => ({
    ...todo,
    createdAt: todo.createdAt.toISOString(),
    updatedAt: todo.updatedAt.toISOString(),
  }));
}

export async function createTodo(title: string, description: string) {
  const todo = await prisma.todo.create({
    data: { title, description },
  });
  revalidatePath("/");
  return {
    ...todo,
    createdAt: todo.createdAt.toISOString(),
    updatedAt: todo.updatedAt.toISOString(),
  };
}

export async function toggleTodo(id: string) {
  const todo = await prisma.todo.findUnique({ where: { id } });
  const updated = await prisma.todo.update({
    where: { id },
    data: { completed: !todo?.completed },
  });
  revalidatePath("/");
  return {
    ...updated,
    createdAt: updated.createdAt.toISOString(),
    updatedAt: updated.updatedAt.toISOString(),
  };
}

export async function updateTodo(
  id: string,
  title: string,
  description: string
) {
  const updated = await prisma.todo.update({
    where: { id },
    data: { title, description },
  });
  revalidatePath("/");
  return {
    ...updated,
    createdAt: updated.createdAt.toISOString(),
    updatedAt: updated.updatedAt.toISOString(),
  };
}

export async function deleteTodo(id: string) {
  await prisma.todo.delete({ where: { id } });
  revalidatePath("/");
}

export async function clearCompleted() {
  await prisma.todo.deleteMany({ where: { completed: true } });
  revalidatePath("/");
}
