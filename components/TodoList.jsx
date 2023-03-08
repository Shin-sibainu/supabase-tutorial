import React, { useState } from "react";
import { supabase } from "../utils/supabase";
// import { useAddTodo } from "../hooks/useAddTodo";

const TodoList = ({ todos, fetchTodos }) => {
  const handleDelete = async (id) => {
    await supabase.from("todos").delete().eq("id", id);

    //全タスク取得
    await fetchTodos();
  };

  return (
    <>
      <ul className="mx-auto">
        {todos?.map((todo) => (
          <div
            key={todo.id}
            className="flex bg-orange-200 mb-2 mt-2 rounded-md p-2 justify-between"
          >
            <li className="text-lg font-medium">✅ {todo.title}</li>
            <span
              className="cursor-pointer"
              onClick={() => handleDelete(todo.id)}
            >
              ✖
            </span>
          </div>
        ))}
      </ul>
    </>
  );
};

export default TodoList;
