import React, { useReducer, useEffect } from "react";
import { todoReducer } from "./todoReducer";

import { useForm } from "./useForm";

const init = () => {
  return JSON.parse(localStorage.getItem("todos")) || [];
};

const TodoApp = () => {
  const [todos, dispatch] = useReducer(todoReducer, [], init);

  const [{ description }, handleInputChange, reset] = useForm({
    description: "",
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (description.trim().length <= 1) {
      return;
    }

    const newTodo = {
      id: new Date().getTime(),
      desc: description,
      done: false,
    };

    const action = {
      type: "add",
      payload: newTodo,
    };

    dispatch(action);
    reset();
  };
  return (
    <div>
      <h1>Todo App ({todos.length})</h1>
      <hr />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <ul style={{ flex: 1, width: "100%" }}>
          {todos.map((todo, i) => (
            <li key={todo.id}>
              <p>
                {i + 1}.{todo.desc}
              </p>
              <button>Delete</button>
            </li>
          ))}
        </ul>
        <form onSubmit={handleSubmit} style={{ flex: 1, width: "100%" }}>
          <input
            type="text"
            name="description"
            value={description}
            onChange={handleInputChange}
          />
          <button type="submit">add</button>
        </form>
      </div>
    </div>
  );
};

export default TodoApp;
