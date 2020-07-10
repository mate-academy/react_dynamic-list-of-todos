import React, { useState } from 'react';
import './App.css';

import { getTodos, getUsers, Todo } from './helpers/api';
import { TodoCard } from './TodoCard/TodoCard';

const getVisibleTodos = (todos: Todo[], sortBy: string) => {
  switch (sortBy) {
    case 'title':
      return [...todos].sort((a, b) => a.title.localeCompare(b.title));

    case 'completed':
      return [...todos].sort((a, b) => Number(a.completed) - Number(b.completed));

    case 'id':
      return [...todos].sort((a, b) => a.id - b.id);

    default:
      return todos;
  }
};

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('');

  const loadData = async () => {
    setIsLoading(true);

    const todosFromServer = await getTodos();
    const usersFromServer = await getUsers();

    const todosWithUsers = todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId),
    }));

    setTodos(todosWithUsers);
    setIsLoading(false);
  };

  const visibleTodos = getVisibleTodos(todos, sortBy);

  return (
    <>
      {visibleTodos.length > 0
        ? (
          <>
            <div>
              <button
                type="button"
                onClick={() => setSortBy('title')}
              >
                Sort by Title
              </button>
              <button
                type="button"
                onClick={() => setSortBy('completed')}
              >
                Sort by status
              </button>
              <button
                type="button"
                onClick={() => setSortBy('id')}
              >
                Sort by id
              </button>
            </div>
            <ul>
              {visibleTodos.map(todo => (
                <li key={todo.id}>
                  <TodoCard todo={todo} />
                </li>
              ))}
            </ul>
          </>
        )
        : (
          <button type="button" onClick={loadData}>{!isLoading ? 'Load' : 'Loading'}</button>
        )}
    </>
  );
};

export default App;
