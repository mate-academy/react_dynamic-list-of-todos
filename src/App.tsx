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
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [data, setData] = useState<Todo[]>([]);

  const [activeTodo, setActiveTodo] = useState<Todo | undefined>(undefined);
  const [query, setQuery] = useState('');
  const [type, setType] = useState(Filter.ALL);

  const hasTodo = !!data;

  useEffect(() => {
    const fetchData = async () => {
      const dataFetch = await getTodos();

      setData(dataFetch);
    };

    fetchData();
  }, []);

  const handleSetQuery = (arg: string) => {
    setQuery(arg);
  };

  const handleSetType = (arg: Filter) => {
    setType(arg);
  };

  const handleSetActiveTodo = (arg: Todo | undefined) => {
    setActiveTodo(arg);
  };

  const filter = (filterType: string) => {
    let dataFromServer: undefined | Todo[];

    switch (filterType) {
      case Filter.ACTIVE:
        dataFromServer = data.filter(elem => !elem.completed);
        break;
      case Filter.COMPLETED:
        dataFromServer = data.filter(elem => elem.completed);
        break;
      default:
        dataFromServer = data;
        break;
    }

    if (query.trim() !== '' && query) {
      return dataFromServer.filter(elem => {
        return elem.title.toLowerCase().includes(query.toLowerCase());
      });
    }

    return dataFromServer;
  };

  const filteredTodos = filter(type);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                handleSetQuery={handleSetQuery}
                filter={filteredTodos}
                handleSetType={handleSetType}
              />
            </div>

            <div className="block">
              {hasTodo ? (
                <TodoList
                  data={filteredTodos}
                  handleSetActiveTodo={handleSetActiveTodo}
                  activeTodo={activeTodo}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {activeTodo && (
        <TodoModal
          activeTodo={activeTodo}
          handleSetActiveTodo={handleSetActiveTodo}
        />
      )}
    </>
  );
};
