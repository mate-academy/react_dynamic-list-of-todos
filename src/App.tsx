/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

enum SortType {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [cases, setCase] = useState('');
  const [query, setQuery] = useState('');
  const [button, setButton] = useState(false);
  const [todo, setTodo] = useState(todos[0]);
  const [listButton, setListButton] = useState(false);

  useEffect(() => {
    async function getTodo() {
      try {
        const fetchedData = await getTodos();

        setTodos(fetchedData);
        setLoading(false);
      } catch (error) {
        console.error('Error occurred:', error);
        throw error;
      }
    }

    getTodo();
  }, []);

  const setCurrentCase = (currentCase: string) => {
    setCase(currentCase);
  };

  const setCurrentQuery = (currentQuery: string) => {
    setQuery(currentQuery);
  };

  const visibleTodos: Todo[] = useMemo(
    () => todos.filter((element) => {
      switch (cases) {
        case SortType.All:
          return element.title.toLowerCase().includes(query.toLowerCase().trim());
        case SortType.Active:
          return (
            query.length === 0
              ? element.completed === false
              : element.completed === false
               && element.title.toLowerCase().includes(query.toLowerCase().trim())
          );
        case SortType.Completed:
          return (
            query.length === 0
              ? element.completed === true
              : element.completed === true
               && element.title.toLowerCase().includes(query.toLowerCase().trim())
          );
        default:

          return element.title.toLowerCase().includes(query.toLowerCase().trim());
      }
    }),
    [todos, query, cases],
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <div className="block">
              <TodoFilter
                setCurrentCase={setCurrentCase}
                setCurrentQuery={setCurrentQuery}
                cases={cases}
                query={query}
              />
            </div>

            <div className="block">
              {isLoading
                ? (<Loader />)
                : (
                  <TodoList
                    todos={visibleTodos}
                    setButton={setButton}
                    setTodo={setTodo}
                    listButton={listButton}
                    setListButton={setListButton}
                  />
                )}

            </div>
          </div>
        </div>
      </div>
      {button && (
        <TodoModal
          setButton={setButton}
          title={todo.title}
          completed={todo.completed}
          userId={todo.userId}
          id={todo.id}
          setListButton={setListButton}
        />
      )}
    </>
  );
};
