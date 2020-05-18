import React, { useState } from 'react';
import './App.css';
import { getTodos, getUsers } from './helper/api';
import { SortPanel } from './components/SortPanel';
import { TodoList } from './components/TodoList';

const normalizeTodos = async () => {
  const todos = await getTodos();
  const users = await getUsers();

  return todos.map((todo: Todo) => {
    return {
      ...todo,
      user: users.find((user: User) => user.id === todo.userId),
    };
  });
};

const App = () => {
  const [loading, setLoading] = useState(false);
  const [isContentVisible, setContentVisible] = useState(false);
  const [todos, setTodos] = useState<TodoNormalized[]>([]);

  const onLoadClick = () => {
    setLoading(true);
    normalizeTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setLoading(false);
        setContentVisible(true);
      });
  };

  const sortTodos = (sortName: string|boolean) => {
    switch (sortName) {
      case 'title':
        setTodos([...todos].sort((a, b) => {
          return a.title.localeCompare(b.title);
        }));

        return;
      case 'completed':
        setTodos([...todos].sort((a, b) => {
          return +a.completed - +b.completed;
        }));

        return;
      case 'user':
        setTodos([...todos].sort((a, b) => {
          return a.user.name.localeCompare(b.user.name);
        }));

        return;
      default:
        setTodos([...todos]);
    }
  };


  const changeTodoStatus = (id: number) => {
    const actualTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo,
          completed: !todo.completed };
      }

      return todo;
    });

    setTodos(actualTodos);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {!isContentVisible ? (
        <button
          type="button"
          onClick={onLoadClick}
          className="btn btn-success"
        >
          Load
        </button>
      )
        : (
          <>
            <SortPanel sorted={sortTodos} />
            <TodoList changeStatus={changeTodoStatus} todos={todos} />
          </>
        )}
    </>
  );
};

export default App;
