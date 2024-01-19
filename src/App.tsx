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
  const [loader, setLoader] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handlerFilterParams = todos.filter(todo => {
    switch (filter) {
      case 'all':
        return todo;
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return todo;
    }
  }).filter(todo => todo.title.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    setLoader(true);

    setTimeout(() => {
      getTodos()
        .then(setTodos)
        .finally(() => setLoader(false));
    }, 100);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                setFilter={setFilter}
                setSearch={setSearch}
                search={search}
              />
            </div>

            <div className="block">
              {loader ? (
                <Loader />
              ) : (
                <TodoList
                  todos={handlerFilterParams}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={(todo: Todo) => setSelectedTodo(todo)}
                />
              )}

            </div>
          </div>
        </div>
      </div>

      {selectedTodo ? <TodoModal selectedTodo={selectedTodo} setSelectedTodo={setSelectedTodo} /> : ''}
    </>
  );
};
