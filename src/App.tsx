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

const noConsole = console;

type Option = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [list, setList] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [option, setOption] = useState<Option>('all');
  const [query, setQuery] = useState<string>('');
  const [task, setTask] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(setList)
      .catch((error) => noConsole.log('Error in loading todos', error))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos = list.filter((todo:Todo) => todo.title.search(new RegExp(query.trim(), 'i')) > -1)
    .filter((todo:Todo) => (option === 'all'
    || (option === 'active' && !todo.completed)
    || (option === 'completed' && todo.completed)));

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleQuery={(value:string) => setQuery(value)}
                handleOption={(value:string) => setOption(value as Option)}
                query={query}
                option={String(option)}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (
                  <TodoList
                    list={filteredTodos}
                    activeTodo={task}
                    handleTask={(todo:Todo) => setTask(todo)}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {task && <TodoModal todo={task} handleClose={() => setTask(null)} />}
    </>
  );
};
