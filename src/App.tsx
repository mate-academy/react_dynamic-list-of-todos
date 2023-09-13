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
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visiableTodos, setVisiableTodos] = useState<Todo[]>([]);
  const [loader, setLoader] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  const filterByStatus = (status: string, todosList: Todo[]) => {
    switch (status) {
      case 'active':
        setVisiableTodos(todosList.filter((todo => todo.completed)));
        break;

      case 'completed':
        setVisiableTodos(todosList.filter((todo => !todo.completed)));
        break;

      case 'all':
      default:
        setVisiableTodos(todosList);
        break;
    }
  };

  useEffect(() => {
    getTodos()
      .then(setTodos);
  }, []);

  useEffect(() => {
    setLoader(true);
    getTodos()
      .then(setVisiableTodos)
      .finally(() => setLoader(false));
  }, []);

  useEffect(() => {
    const filteredByQueryTodos = todos.filter((todo => todo.title.toLowerCase().includes(query.toLowerCase())));

    filterByStatus(filter, filteredByQueryTodos);
  }, [filter, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter filter={filter} setFilter={setFilter} query={query} setQuery={setQuery} />
            </div>

            <div className="block">
              {loader
                ? <Loader />
                : <TodoList todos={visiableTodos} setSelectedTodo={setSelectedTodo} selectedTodo={selectedTodo} />}
            </div>
          </div>
        </div>
      </div>

      {!loader && selectedTodo
        && <TodoModal todo={selectedTodo} setSelectedTodo={setSelectedTodo} />}
    </>
  );
};
