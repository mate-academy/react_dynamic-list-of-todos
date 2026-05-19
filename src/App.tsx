/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

type Filter = 'all' | 'active' | 'completed';

const getFilteredTodos = (todos: Todo[], filter: Filter, search: string) => {
  let result = todos;

  switch (filter) {
    case 'active':
      result = result.filter(todo => !todo.completed);
      break;
    case 'completed':
      result = result.filter(todo => todo.completed);
      break;
    default:
      break;
  }

  const prepearedSearch = search.trim().toLowerCase();

  if (prepearedSearch) {
    result = result.filter(todo =>
      todo.title.toLowerCase().includes(prepearedSearch),
    );
  }

  return result;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(data => setTodos(data))
      .catch(error => alert(error))
      .finally(() => setIsLoading(false));
  }, []);

  const fiteredTodos = getFilteredTodos(todos, filter, search);

  const openModal = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const selectedTodoModal =
    todos.find(todo => todo.id === selectedTodo?.id) || null;

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilter={setFilter}
                search={search}
                onSearch={setSearch}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={fiteredTodos}
                  onSelectTodo={openModal}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo !== null && (
        <TodoModal
          todo={selectedTodoModal!}
          onCloseModal={setSelectedTodo}
        />
      )}
    </>
  );
};
