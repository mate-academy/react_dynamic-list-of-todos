import React, { useEffect, useMemo, useState } from 'react';
import './App.css';

import { getUsers, getTodos, Todo } from './helpers/api';
import { TodoCard } from './TodoCard';

const getVisibleTodos = (todos: Todo[], sortType: string) => {
  switch (sortType) {
    case 'title':
      return [...todos].sort((a, b) => a.title.localeCompare(b.title));

    case 'id':
      return [...todos].sort((a, b) => a.id - b.id);

    case 'userName':
      return [...todos].sort((a, b) => {
        return (a.user && b.user)
          ? a.user.name.localeCompare(b.user.name)
          : 0;
      });

    default:
      return todos;
  }
};

const App = () => {
  const [sortType, setSortType] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState('');

  const loadData = async () => {
    const todosFromServer = await getTodos();
    const usersFromServer = await getUsers();

    const todosWithUsers = todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId),
    }));

    setTodos(todosWithUsers);
  };

  useEffect(() => {
    loadData();
  }, []);

  const visibleTodos = useMemo(() => {
    return getVisibleTodos(todos, sortType);
  }, [todos, sortType]);

  return (
    <>
      <button type="button" onClick={() => setTodos(todos)}>Reset</button>
      <button type="button" onClick={() => setSortType('title')}>Sort by title</button>
      <button type="button" onClick={() => setSortType('id')}>Sort by id</button>
      <button type="button" onClick={() => setSortType('userName')}>Sort by user</button>

      <input
        type="text"
        value={text}
        onChange={(event) => {
          setText(event.target.value);
        }}
      />

      <ul className="TodoList">
        {visibleTodos.map(todo => (
          <li key={todo.id}>
            <TodoCard todo={todo} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
