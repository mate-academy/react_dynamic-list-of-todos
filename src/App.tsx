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
  let prepareTodos = [...todos];

  if (searchResult) {
    prepareTodos = prepareTodos.filter(todo => {
      return todo.title
        .toLowerCase()
        .includes(searchResult.toLowerCase().trim());
    });
  }

  switch (statusSelect) {
    case FilterType.COMPLETED:
      prepareTodos = prepareTodos.filter(todo => todo.completed);
      break;
    case FilterType.ACTIVE:
      prepareTodos = prepareTodos.filter(todo => !todo.completed);
      break;
    default:
      break;
  }

  return prepareTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [statusSelect, setStatusSelect] = useState(FilterType.ALL);
  const [searchResult, setSearchResult] = useState('');

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      });
  }, []);

  const onShowModal = (todo: Todo) => setSelectedTodo(todo);
  const onCloseModal = () => setSelectedTodo(null);
  const onFilterStatus = (value: FilterType) => setStatusSelect(value);
  const onSearchChange = (query: string) => setSearchResult(query);
  const onClearSearch = () => setSearchResult('');

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
                onFilterStatus={onFilterStatus}
                searchResult={searchResult}
                onSearchChange={onSearchChange}
                onClearSearch={onClearSearch}
              />
            </div>

            <div className="block">
              {todos.length ? (
                <TodoList
                  todos={visibleTodos}
                  onShowModal={onShowModal}
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
          onCloseModal={onCloseModal}
        />
      )}
    </>
  );
};
