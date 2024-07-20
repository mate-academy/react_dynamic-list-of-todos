/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { Filters } from './types/Filter';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [choosedTodo, setChoosedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState({
    select: 'all',
    text: '',
  });

  const listTodo = useMemo(() => {
    return todos
      .filter((todo: Todo) => {
        switch (filter.select) {
          case 'active':
            return todo.completed !== true;
          case 'completed':
            return todo.completed === true;
          default:
            return todo;
        }
      })
      .filter((todo: Todo) => {
        return todo.title.includes(filter.text);
      });
  }, [todos, filter]);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      // eslint-disable-next-line no-console
      .catch(error => console.error('error #%d', error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilter={(filters: Filters) => setFilter(filters)}
                filters={filter}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={listTodo}
                  choosedTodo={choosedTodo}
                  changeTodo={item => setChoosedTodo(item)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {choosedTodo && (
        <TodoModal todo={choosedTodo} closeModal={() => setChoosedTodo(null)} />
      )}
    </>
  );
};
