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
import { SortField } from './types/SortField';

const getFilteredTodos = (
  todos: Todo[],
  filter: SortField,
  searchTerm: string,
) => {
  if (searchTerm) {
    todos.filter(todo =>
      todo.title.toLowerCase().includes(searchTerm.trim().toLowerCase()),
    );
  }

  switch (filter) {
    case SortField.Active:
      return todos.filter(todo => !todo.completed);
    case SortField.Completed:
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<SortField>(SortField.All);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectTodo, setSelectTodo] = useState<Todo | null>(null);
  const [hasLoading, setHasLoading] = useState(false);

  const filteredTodos = getFilteredTodos(todos, filter, searchTerm);

  useEffect(() => {
    setHasLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => {
        setHasLoading(false);
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
              {hasLoading && <Loader />}
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
