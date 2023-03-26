/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export function filterTodos(todos: Todo[], query: string): Todo[] {
  return todos.filter(todo => {
    return todo.title
      .toLowerCase()
      .includes(query.toLowerCase().trim());
  });
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [statusSelect, setStatusSelect] = useState('all');
  const [searchResult, setSearchResult] = useState('');

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      });
  }, []);

  const onShowModal = (todo: Todo) => setSelectedTodo(todo);
  const onCloseModal = () => setSelectedTodo(null);
  const onFilterStatus = (value: string) => setStatusSelect(value);
  const onSearchChange = (query: string) => setSearchResult(query);
  const onClearSearch = () => setSearchResult('');

  let prepareTodos = [...todos];

  switch (statusSelect) {
    case 'all':
      prepareTodos = [...todos];
      break;
    case 'completed':
      prepareTodos = todos.filter(todo => todo.completed);
      break;
    case 'active':
      prepareTodos = todos.filter(todo => !todo.completed);
      break;
    default:
      prepareTodos = [...todos];
      break;
  }

  if (searchResult.length) {
    prepareTodos = filterTodos(prepareTodos, searchResult);
  }

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
                  todos={prepareTodos}
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

      {selectedTodo && <TodoModal selectedTodo={selectedTodo} onCloseModal={onCloseModal} />}
    </>
  );
};
