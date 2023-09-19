/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { Filter } from './types/filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalTodo, setModalTodo] = useState<Todo | null>(null);
  const [filter, setfilter] = useState<Filter>('all');
  const [textFilter, setTextFilter] = useState<string>('');

  const handleSelectTodo = (todo: Todo | null) => {
    setModalTodo(todo);
  };

  const handleTextFilter = (value: string) => {
    setTextFilter(value);
  };

  const handleSelectFilter = (filterBy: Filter) => {
    setfilter(filterBy);
  };

  const fetchData = async () => {
    const t0d0s = getTodos();

    setTodos(await t0d0s);
  };

  useEffect(() => {
    fetchData().then(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter handleSelectFilter={handleSelectFilter} handleTextFilter={handleTextFilter} textFilter={textFilter} />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && <TodoList todos={todos} handleSelectTodo={handleSelectTodo} filter={filter} textFilter={textFilter} />}
            </div>
          </div>
        </div>
      </div>

      {modalTodo && <TodoModal todo={modalTodo} handleSelectTodo={handleSelectTodo} />}
    </>
  );
};
