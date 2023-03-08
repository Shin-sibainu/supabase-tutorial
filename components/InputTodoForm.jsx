import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { useAddTodo } from "../hooks/useAddTodo";
import TodoList from "./TodoList";

const InputTodoForm = () => {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const todos = await supabase.from("todos").select("*");
    setTodos(todos.data);
  };

  const pushTodo = async (e) => {
    e.preventDefault();

    if (title === "") return;

    //追加
    await supabase.from("todos").insert({ title: title });

    //全タスク取得
    await fetchTodos();
    setTitle("");
  };

  return (
    <section>
      <h3 className="text-center mb-2 text-2xl font-medium">
        Todo with Supabase
      </h3>
      <form onSubmit={(e) => pushTodo(e)}>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          className="outline-none shadow-lg mr-2 p-1"
          value={title}
        />
        <button className="shadow-md border-2 px-1 py-1 rounded-lg bg-green-200">
          Add
        </button>
      </form>
      <TodoList todos={todos} fetchTodos={fetchTodos} />
    </section>
  );
};

export default InputTodoForm;
