import React, { FC, useState } from 'react';
import './App.css';
import { TodoList } from './TodoList/TodoList';
import {
  getTodo,
  getUser,
  TodoWithUser,
  User,
} from './api';

const App: FC = () => {
  const [todos, setTodo] = useState<TodoWithUser[]>([]);
  const [isLoad, setLoad] = useState<boolean>();

  const loadTodo = () => {
    setLoad(true);
    Promise.all([getTodo(), getUser()])
      .then(response => {
        const todo = response[0].map(item => ({
          ...item,
          user: response[1].find(person => person.id === item.userId) as User,
        }));

        setTodo(todo);
      })
      .catch(() => {
        setLoad(false);
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

  if (todos.length === 0) {
    return (
      <div>
        <button
          type="button"
          onClick={loadTodo}
        >
            Load todo
        </button>
        <p>{isLoad ? 'Loading...' : ''}</p>
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
