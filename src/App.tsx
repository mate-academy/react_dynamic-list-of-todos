import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import * as api from './api/api';

export const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);

  const loadTodos = () => {
    api.getTodos()
      .then(data => setTodos(data));
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const randomizeTodos = () => {
    setTodos(prevTodos => prevTodos.sort(() => Math.random() - 0.5));
  };

  const toggleComplete = (todoId: number) => {
    setTodos(prevTodos => prevTodos.map(todo => {
      return todo.id !== todoId
        ? todo
        : { ...todo, completed: !todo.completed };
    }));
  };

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={todos}
          selectedUserId={selectedUserId}
          selectUser={(userId: number) => {
            setSelectedUserId(userId);
          }}
          randomizeTodos={randomizeTodos}
          toggleComplete={toggleComplete}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              clearUser={() => {
                setSelectedUserId(null);
              }}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};
