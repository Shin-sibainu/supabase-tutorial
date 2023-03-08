import { supabase } from "../utils/supabase";
import { useState, useEffect } from "react";

export const useAddTodo = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const todos: any = await supabase.from("todos").select("*");
    setTodos(todos.data);
  };

  return { todos, fetchTodos, setTodos };
};
