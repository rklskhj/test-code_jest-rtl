import { useState, useEffect } from "react";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch("https://api.example.com/todos");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setTodos(data);
      setIsLoading(false);
    } catch (err) {
      setError("할 일 목록을 불러오는데 실패했습니다.");
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => {
              /* 체크박스 처리 로직 */
            }}
          />
          {todo.title}
        </li>
      ))}
    </ul>
  );
}
