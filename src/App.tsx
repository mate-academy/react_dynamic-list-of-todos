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
  const [cases, setCase] = useState<SortType>(SortType.All);
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

  const setCurrentCase = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortType = event.target.value;

    setCase(sortType as SortType);
  };

  const setCurrentQuery = (currentQuery: string) => {
    setQuery(currentQuery);
  };

  const visibleTodos: Todo[] = useMemo(
    () => todos.filter((element) => {
      const functionality = element.title.toLowerCase().includes(query.toLowerCase().trim());

      switch (cases) {
        case SortType.All:
        default:
          return functionality;
        case SortType.Active:
          return (
            !query.length
              ? !element.completed
              : !element.completed
               && functionality
          );
        case SortType.Completed:
          return (
            !query.length
              ? element.completed
              : element.completed
               && functionality
          );
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
