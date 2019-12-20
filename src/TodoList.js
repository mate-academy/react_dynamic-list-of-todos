import React, { useState } from 'react';
import './Main.css';
import TodoItem from './TodoItem';
import { getTodos, getUsers } from './todosApi';

const TodoList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isShown, setIsShown] = useState(true);
  const [defaultpreparedTodos, setDefaultPreparedTodos] = useState([]);
  const [preparedTodos, setPreparedTodos] = useState([]);
  const [isSorting, setIsSorting] = useState('id');

  const showPreparedTodos = async() => {
    setIsLoading(true);

    const [listOfTodos, listOfUsers] = await Promise
      .all([getTodos(), getUsers()]);

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

  const sortByTitle = (title) => {
    if (isSorting !== title) {
      setPreparedTodos([...defaultpreparedTodos]
        .sort((a, b) => a.title.localeCompare(b.title)));
      setIsSorting(title);
    } else {
      setPreparedTodos([...defaultpreparedTodos]
        .sort((a, b) => b.title.localeCompare(a.title)));
      setIsSorting('');
    }
  };

  const sortByUser = (title) => {
    if (isSorting !== title) {
      setPreparedTodos([...defaultpreparedTodos]
        .sort((a, b) => a.user.name.localeCompare(b.user.name)));
      setIsSorting(title);
    } else {
      setPreparedTodos([...defaultpreparedTodos]
        .sort((a, b) => b.user.name.localeCompare(a.user.name)));
      setIsSorting();
    }
  };

  const sortByStatus = (title) => {
    if (isSorting !== title) {
      setPreparedTodos([...defaultpreparedTodos]
        .sort((a, b) => a.completed - b.completed));
      setIsSorting(title);
    } else {
      setPreparedTodos([...defaultpreparedTodos]
        .sort((a, b) => b.completed - a.completed));
      setIsSorting();
    }
  };

  const sortById = (title) => {
    if (isSorting !== title) {
      setPreparedTodos([...defaultpreparedTodos]
        .sort((a, b) => a.id - b.id));
      setIsSorting(title);
    } else {
      setPreparedTodos([...defaultpreparedTodos]
        .sort((a, b) => b.id - a.id));
      setIsSorting();
    }
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
                      onClick={() => sort.callback(sort.title)}
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
