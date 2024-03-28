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

export enum SortFild {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

const getFilteredTodos = (
  todos: Todo[],
  filter: SortFild,
  searchTerm: string,
) => {
  let filteredTodos = [...todos];

  if (searchTerm) {
    filteredTodos = todos.filter(todo =>
      todo.title.toLowerCase().includes(searchTerm.trim().toLowerCase()),
    );
  }

  switch (filter) {
    case SortFild.Active:
      return filteredTodos.filter(todo => !todo.completed);
    case SortFild.Completed:
      return filteredTodos.filter(todo => todo.completed);
    default:
      return filteredTodos;
  }
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<SortFild>(SortFild.All);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectTodo, setSelectTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(false);

  const filteredTodos = getFilteredTodos(todos, filter, searchTerm);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilter={setFilter}
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={filteredTodos}
                setSelectTodo={setSelectTodo}
                selectTodo={selectTodo}
              />
            </div>
          </div>
        </div>
      </div>
      {selectTodo && (
        <TodoModal todo={selectTodo} setSelectTodo={setSelectTodo} />
      )}
    </>
  );
};
