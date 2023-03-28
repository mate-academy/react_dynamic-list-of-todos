import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { FilterType } from './types/FilterType';

export function filterTodos(
  todos: Todo[],
  statusSelect: FilterType,
  searchResult: string,
): Todo[] {
  let preparedTodos = [...todos];

  if (searchResult) {
    preparedTodos = preparedTodos.filter(todo => {
      return todo.title
        .toLowerCase()
        .includes(searchResult.toLowerCase().trim());
    });
  }

  switch (statusSelect) {
    case FilterType.COMPLETED:
      preparedTodos = preparedTodos.filter(todo => todo.completed);
      break;
    case FilterType.ACTIVE:
      preparedTodos = preparedTodos.filter(todo => !todo.completed);
      break;
    default:
      break;
  }

  return preparedTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [statusSelect, setStatusSelect] = useState(FilterType.ALL);
  const [searchResult, setSearchResult] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const todosFromServer = await getTodos();

        setTodos(todosFromServer);
      } catch (err) {
        setTodos([]);
      }
    })();
  }, []);

  const handleShowModal = (todo: Todo) => setSelectedTodo(todo);
  const handleCloseModal = () => setSelectedTodo(null);
  const handleFilterStatus = (value: FilterType) => setStatusSelect(value);
  const handleSearchChange = (query: string) => setSearchResult(query);
  const handleClearSearch = () => setSearchResult('');

  const visibleTodos = filterTodos(todos, statusSelect, searchResult);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                statusSelect={statusSelect}
                onFilterStatus={handleFilterStatus}
                searchResult={searchResult}
                onSearchChange={handleSearchChange}
                onClearSearch={handleClearSearch}
              />
            </div>

            <div className="block">
              {todos.length ? (
                <TodoList
                  todos={visibleTodos}
                  onShowModal={handleShowModal}
                  selectedId={selectedTodo?.id}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};
