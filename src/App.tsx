import React, { useState, useMemo } from 'react';
import './App.css';
import { TodoList } from './TodoList/TodoList';
import { getTodos, getUsers } from './Api/Api';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadTodos = () => {
    setIsLoading(true);

    const usersPropmise = getUsers();

    usersPropmise
      .then(result => {
        return setUsers(result);
      });

    const todosPropmise = getTodos();

    todosPropmise
      .then(result => {
        return setTodos(result);
      });
  };

  const mergeTodosWithUserNames = (todoList: Todo[], userList: User[]): Todo[] => {
    return todoList.map(todo => {
      const targetUser = userList.find(user => user.id === todo.userId) as User;

      return {
        ...todo,
        userName: targetUser.name,
      };
    });
  };

  const preparedTodos = useMemo(() => mergeTodosWithUserNames(todos, users), [todos, users]);

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <p>
        <span>Delay of showing is set to 1 second</span>
      </p>
      {preparedTodos.length === 0 && (
        <button type="button" onClick={loadTodos} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Load Todos'}
        </button>
      )}
      <TodoList todos={preparedTodos} />
    </div>
  );
};
