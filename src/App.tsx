/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [loading, setLoadning] = useState(true);
  const [list, setList] = useState<Todo[]>([]);
  const [task, setTask] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [option, setOption] = useState<boolean | null>(null);

  useEffect(() => {
    setLoadning(true);

    getTodos()
      .then((todos) => {
        setList(todos);
        setLoadning(false);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Something bad happened!', error);
        setLoadning(false);
      });
  }, []);

  const modalActive = (todo: Todo) => {
    setTask(todo);
  };

  const closeModal = () => {
    setTask(null);
  };

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
              {loading ? <Loader /> : (
                <TodoList
                  todoList={list}
                  modalActive={(todo) => modalActive(todo)}
                  query={query}
                  option={option}
                  activeTaskId={task?.id || null}
                />
              )}

            </div>
          </div>
        </div>
      </div>

      {task && <TodoModal todo={task} closeModal={closeModal} />}
    </>
  );
};
