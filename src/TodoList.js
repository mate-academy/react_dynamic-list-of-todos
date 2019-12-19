import React, { useState } from 'react';
import PropsTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ getTodos, getUsers }) => {
  const [isLoaded, setLoaded] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [todosData, saveTodos] = useState([]);
  const [usersData, saveUsers] = useState([]);

  const loadTodos = () => {
    setLoading(true);

    setTimeout(async() => {
      const todos = await getTodos();
      const users = await getUsers();

      saveTodos(todos);
      saveUsers(users);
      setLoading(false);
      setLoaded(true);
    }, 500);
  };

  const todosWithUsers = todosData.map((todo) => {
    const user = usersData.find(person => todo.userId === person.id);

    return {
      ...todo,
      userName: user ? user.name : '',
    };
  });

  const sortTodos = (column) => {
    const sortData = [...todosWithUsers].sort((a, b) => {
      switch (typeof a[column]) {
        case 'string':
          return a[column].localeCompare(b[column]);
        case 'number':
        case 'boolean':
          return a[column] - b[column];
        default:
          return 0;
      }
    });

    if (sortData[0].id === todosWithUsers[0].id) {
      sortData.reverse();
    }

    saveTodos(sortData);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    isLoaded
      ? (
        <table
          className="app__table"
          border={1}
        >
          <thead>
            <tr>
              <th onClick={() => sortTodos('id')}>№</th>
              <th onClick={() => sortTodos('title')}>Todo</th>
              <th onClick={() => sortTodos('completed')}>Completed</th>
              <th onClick={() => sortTodos('userName')}>User Name</th>
            </tr>
          </thead>
          <tbody>
            {todosWithUsers.map(todo => (
              <tr key={todo.title}>
                <TodoItem todo={todo} />
              </tr>
            ))}
          </tbody>
        </table>
      )
      : (
        <button
          type="button"
          onClick={loadTodos}
        >
          Load
        </button>
      )
  );
};

TodoList.propTypes = {
  getTodos: PropsTypes.func.isRequired,
  getUsers: PropsTypes.func.isRequired,
};

export default TodoList;
