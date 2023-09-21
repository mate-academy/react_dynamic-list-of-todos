/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';

type Option = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [list, setList] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [option, setOption] = useState<Option>('all');
  const [query, setQuery] = useState<string>('');
  const [task, setTask] = useState<Todo | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todos = await getTodos();

        setList(todos);
      } catch (error) {
        // eslint-disable-next-line
        console.log('Error in loading todos', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const filteredTodos = list
    .filter((todo: Todo) => todo.title.search(new RegExp(query.trim(), 'i')) > -1)
    .filter((todo: Todo) => option === 'all'
      || (option === 'active' && !todo.completed)
      || (option === 'completed' && todo.completed));

  const handleQuery = (value: string) => {
    setQuery(value);
  };

  const handleOption = (value: string) => {
    setOption(value as Option);
  };

  const handleTask = (todo: Todo) => {
    setTask(todo);
  };

  const handleClose = () => {
    setTask(null);
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
                query={query}
                option={option as string}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  list={filteredTodos}
                  activeTodo={task}
                  handleTask={handleTask}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {task && (
        <TodoModal
          todo={task}
          handleClose={handleClose}
        />
      )}
    </>
  );
};
