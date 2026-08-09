/* eslint-disable max-len */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { getTodos } from './api'; // Якщо завантажуєте todos з API
import { getUser } from './api'; // Додано розширення .ts
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false);

  // Використовуємо setTodos для завантаження початкових todos
  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsUserLoading(true);
    setUser(null);

    getUser(todo.userId)
      .then(setUser)
      .finally(() => {
        setIsUserLoading(false);
      }); // Прибрано console.error
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
    setUser(null);
  };

  return (
    <div className="section">
      <TodoList todos={todos} onSelectTodo={handleSelectTodo} />

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={user}
          isLoading={isUserLoading}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};
