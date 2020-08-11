import React, { FC, useState } from 'react';
import './App.css';
import { TodoList } from './TodoList/TodoList';
import { getTodo, getUser } from './api/api';

const App: FC = () => {
  const [todos, setTodo] = useState<TodoWithUser[]>([]);
  const [isLoaded, setLoading] = useState(false);

  const loadTodo = () => {
    setLoading(true);
    Promise.all([getTodo(), getUser()])
      .then(response => {
        const preperedTodos = response[0].map(item => ({
          ...item,
          user: response[1].find(person => person.id === item.userId) as User,
        }));

        setTodo(preperedTodos);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const sort = (typeOfSort: string) => {
    const newTodos = [...todos];

    switch (typeOfSort) {
      case 'title': {
        newTodos.sort((a, b) => a.title.localeCompare(b.title));
        break;
      }

      case 'completed': {
        newTodos.sort((a, b) => Number(b.completed) - Number(a.completed));
        break;
      }

      case 'name': {
        newTodos.sort((a, b) => a.user.name.localeCompare(b.user.name));
        break;
      }

      default:
    }

    setTodo(newTodos);
  };

  return (
    <>
      {!todos.length ? (
        <div>
          <button
            type="button"
            onClick={loadTodo}
          >
              Load todo
          </button>
          {isLoaded && <p>Loading...</p>}
        </div>
      )
        : (
          <TodoList
            todos={todos}
            sort={sort}
          />
        )}
    </>
  );
};

export default App;
