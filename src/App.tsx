/* eslint-disable max-len */
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import Filter from './types/Filter';

export const App: React.FC = () => {
  const [data, setData] = useState<Todo[] | []>([]);
  const [activeTodo, setActiveTodo] = useState<undefined | Todo>(undefined);
  const [query, setQuery] = useState('');
  const [type, setType] = useState(Filter.ALL);

  const filter = async (filterType: string) => {
    let dataFromServer: undefined | Todo[];
    const dataFetch = await getTodos();

    switch (filterType) {
      case Filter.ALL:
        dataFromServer = dataFetch;
        break;
      case Filter.ACTIVE:
        dataFromServer = dataFetch.filter(elem => !elem.completed);
        break;
      case Filter.COMPLETED:
        dataFromServer = dataFetch.filter(elem => elem.completed);
        break;
      default:
        dataFromServer = dataFetch;
        break;
    }

    if (query.trim() !== '' && query) {
      return dataFromServer.filter(elem => {
        return elem.title.toLowerCase().includes(query.toLowerCase());
      });
    }

    return dataFromServer;
  };

  const values = {
    query,
    setQuery,
    filter,
    setData,
    type,
    setType,
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter values={values} />
            </div>

            <div className="block">
              {data.length > 0 ? (
                <TodoList
                  data={data}
                  setActiveTodo={setActiveTodo}
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
        <TodoModal activeTodo={activeTodo} setActiveTodo={setActiveTodo} />
      )}
    </>
  );
};
