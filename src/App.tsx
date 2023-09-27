import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Options } from './types/Options';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<Todo[]>([]);
  const [task, setTask] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [option, setOption] = useState<Options | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const todos = await getTodos();

        setList(todos);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Something bad happened!', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

  const handleOption = (value: Options | null) => {
    setOption(value);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleQuery={handleQuery}
                handleOption={handleOption}
              />
            </div>

            <div className="block">
              {loading ? <Loader /> : null}

              <TodoList
                todoList={list}
                modalActive={(todo: Todo) => modalActive(todo)}
                query={query}
                option={option}
                activeTaskId={task?.id || null}
              />
            </div>
          </div>
        </div>
      </div>

      {task && <TodoModal todo={task} closeModal={closeModal} />}
    </>
  );
};
