import React, { FC, useState } from 'react';
import './App.css';
import { TodoList } from './TodoList/TodoList';
import { getTodo, getUser } from './api/apiData';
import { User, TodoWithUser } from './api/apiInterfaces';

const App: FC = () => {
  const [todos, setTodo] = useState<TodoWithUser[]>([]);
  const [isLoaded, setLoading] = useState<boolean>();

  const loadTodo = () => {
    setLoading(true);
    Promise.all([getTodo(), getUser()])
      .then(response => {
        const todo = response[0].map(item => ({
          ...item,
          user: response[1].find(person => person.id === item.userId) as User,
        }));

        setTodo(todo);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const sort = (typeOfSort: string) => {
    const newTodo = [...todos];

    switch (typeOfSort) {
      case 'by title': {
        newTodo.sort((a, b) => a.title.localeCompare(b.title));
        break;
      }

      case 'by completed': {
        newTodo.sort((a, b) => Number(b.completed) - Number(a.completed));
        break;
      }

      case 'by name': {
        newTodo.sort((a, b) => a.user.name.localeCompare(b.user.name));
        break;
      }

      default:
        break;
    }

    setTodo(newTodo);
  };

  if (!todos.length) {
    return (
      <div>
        <button
          type="button"
          onClick={loadTodo}
        >
            Load todo
        </button>
        {isLoaded && <p>Loading...</p>}
      </div>
    );
  }

  return (
    <>
      <TodoList
        todos={todos}
        sort={sort}
      />
    </>
  );
};

export default App;
