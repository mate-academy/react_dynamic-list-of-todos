import React, { useState } from 'react';
import './App.css';
import TodoItem from './TodoItem';
import { getTodos, getUsers } from './todosApi';

const TodoList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isShown, setIsShown] = useState(true);
  const [defaultpreparedTodos, setDefaultPreparedTodos] = useState([]);
  const [preparedTodos, setPreparedTodos] = useState([]);

  const showPreparedTodos = async() => {
    setIsLoading(true);

    const listOfTodos = await getTodos();
    const listOfUsers = await getUsers();
    const mergedTodos = listOfTodos.map((todo) => {
      const user = listOfUsers.find(person => person.id === todo.userId);

      return {
        ...todo,
        user,
      };
    });

    setPreparedTodos(mergedTodos);
    setDefaultPreparedTodos(mergedTodos);
    setIsLoading(false);
    setIsShown(false);
  };

  const sortByTitle = () => {
    setPreparedTodos([...defaultpreparedTodos]
      .sort((a, b) => a.title.localeCompare(b.title)));
  };

  const sortByUser = () => {
    setPreparedTodos([...defaultpreparedTodos]
      .sort((a, b) => a.user.name.localeCompare(b.user.name)));
  };

  const sortByStatus = () => {
    setPreparedTodos([...defaultpreparedTodos]
      .sort((a, b) => a.completed - b.completed));
  };

  const sortById = () => {
    setPreparedTodos([...defaultpreparedTodos]
      .sort((a, b) => a.id - b.id));
  };
  const sortList = [
    {
      title: 'id', callback: sortById,
    },
    {
      title: 'title', callback: sortByTitle,
    },
    {
      title: 'status', callback: sortByStatus,
    },
    {
      title: 'user', callback: sortByUser,
    },
  ];

  return (
    <div className="App">
      <h1>Dynamic list of todos</h1>
      {
        isShown ? (
          <button
            type="button"
            onClick={() => {
              showPreparedTodos();
            }}
          >
            {isLoading ? 'Loading...' : 'Load'}
          </button>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  {sortList.map(sort => (
                    <th
                      onClick={sort.callback}
                      key={sort.title}
                    >
                      {sort.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {preparedTodos.map(todo => (
                  <TodoItem
                    todo={todo}
                    key={todo.id}
                  />
                ))}
              </tbody>

            </table>
          </>
        )
      }
    </div>
  );
};

export default TodoList;
