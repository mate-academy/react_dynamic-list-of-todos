/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [isLoading, setIsLoadning] = useState(true);
  const [list, setList] = useState<Todo[]>([]);
  const [task, setTask] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [option, setOption] = useState<boolean | null>(null);

  useEffect(() => {
    getTodos()
      .then((todos) => {
        setList(todos);
        setIsLoadning(false);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Something bad happened!', error);
        setIsLoadning(false);
      });
  }, []);

  const handleQuery = (value: string) => {
    setQuery(value);
  };

  const handleOption = (value: boolean | null) => {
    setOption(value);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <div className="block">
              <TodoFilter handleQuery={handleQuery} handleOption={handleOption} />
            </div>

            <div className="block">
              {isLoading && <Loader />}

              <TodoList
                todoList={list}
                modalActive={(todo) => setTask(todo)}
                query={query}
                option={option}
                activeTaskId={task?.id || null}
              />
            </div>
          </div>
        </div>
      </div>
      {task && <TodoModal todo={task} closeModal={() => setTask(null)} />}
    </>
  );
};
