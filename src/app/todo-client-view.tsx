"use client";

import { useState, useRef } from "react";
import { Todo } from "@/types";
import { addOrEditTodo, deleteTodo, toggleTodo } from "./actions";

// The Modal component for adding/editing todos
function TodoModal({
  todo,
  onClose,
}: {
  todo: Partial<Todo> | null;
  onClose: () => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  // The action function to be called on form submission
  const handleFormAction = async (formData: FormData) => {
    await addOrEditTodo(formData);
    onClose(); // Close the modal after submission
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{todo?.id ? "Edit Todo" : "Add New Todo"}</h2>
          <button onClick={onClose} className="close-button">
            &times;
          </button>
        </div>
        <form ref={formRef} action={handleFormAction} className="modal-form">
          {/* Hidden input for the ID when editing */}
          {todo?.id && <input type="hidden" name="id" value={todo.id} />}

          <input
            type="text"
            name="title"
            placeholder="Title"
            defaultValue={todo?.title || ""}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            defaultValue={todo?.description || ""}
          />
          <button type="submit">{todo?.id ? "Update Todo" : "Add Todo"}</button>
        </form>
      </div>
    </div>
  );
}

// The main client component that manages state and renders the list
export function TodoClientView({ initialTodos }: { initialTodos: Todo[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Partial<Todo> | null>(null);

  const handleAddNew = () => {
    setEditingTodo({}); // Empty object for a new todo
    setIsModalOpen(true);
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTodo(null);
  };

  return (
    <div className="container">
      <header className="app-header">
        <h1>Shared Todo App</h1>
        <button onClick={handleAddNew} className="add-button">
          + Add New Todo
        </button>
      </header>

      {isModalOpen && (
        <TodoModal todo={editingTodo} onClose={handleCloseModal} />
      )}

      <ul className="todo-list">
        {initialTodos.length > 0 ? (
          initialTodos.map((todo) => (
            <li
              key={todo.id}
              className={`todo-item ${todo.isDone ? "done" : ""}`}
            >
              <div className="todo-content">
                <h2>{todo.title}</h2>
                <p>{todo.description}</p>
              </div>
              <div className="todo-actions">
                <button
                  onClick={() => toggleTodo(todo.id, todo.isDone)}
                  className="action-button"
                >
                  {todo.isDone ? "Undo" : "Done"}
                </button>
                <button
                  onClick={() => handleEdit(todo)}
                  className="action-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="action-button delete"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="empty-state">No to-dos yet. Add one to get started!</p>
        )}
      </ul>
    </div>
  );
}
