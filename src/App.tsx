/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showUser, setShowUser] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');
  const [isLook, setIsLook] = useState(0);

  useEffect(() => {
    getTodos().then((array: Todo[]) => {
      setTodos(array);
    });
  }, []);

  const handleShowUser = (todo: Todo): void => {
    setShowUser(todo);
  };

  const handleFilter = (param: string): Todo[] => {
    switch (param) {
      case 'active':
        return todos.filter((todo) => {
          return todo.completed === false;
        });
      case 'completed':
        return todos.filter((todo) => {
          return todo.completed === true;
        });
      case 'all':
        return todos;
      default:
        return todos;
    }
  };

  const selectededTodos = handleFilter(filter);

  const filteredTodos = () => {
    if (query) {
      return selectededTodos.filter((todo) => {
        return todo.title.toLowerCase().includes(query.toLowerCase());
      });
    }

    return selectededTodos;
  };

  const resultTodos = filteredTodos();

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setQuery={setQuery}
                setFilter={setFilter}
                query={query}
              />
            </div>

            <div className="block">
              {todos.length > 0 ? (
                <TodoList
                  resultTodos={resultTodos}
                  handleShowUser={handleShowUser}
                  isLook={isLook}
                  setIsLook={setIsLook}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {showUser ? (
        <TodoModal
          showUser={showUser}
          setShowUser={setShowUser}
          setIsLook={setIsLook}
        />
      ) : ''}
    </>
  );
};
