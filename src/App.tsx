/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { filterByTitle, filterByTodoStatus } from './helpers';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showTodoModal, setShowTodoModal] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [sortBy, setSortBy] = useState('all');
  const [query, setQuery] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  let visiableTodos = filterByTodoStatus(todos, sortBy);

  visiableTodos = filterByTitle(visiableTodos, query);

  const selectedTodo = todos.find(todo => todo.id === selectedTodoId);

  useEffect(() => {
    if (selectedTodoId) {
      setShowTodoModal(true);
    }
  }, [selectedTodoId]);

  const closeTodoModal = () => {
    setSelectedTodoId(0);
    setShowTodoModal(false);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                changeSortBy={setSortBy}
                query={query}
                changeQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading
                ? (<Loader />)
                : (
                  <TodoList
                    todos={visiableTodos}
                    selectedTodoId={selectedTodoId}
                    setSelectedTodoId={setSelectedTodoId}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {showTodoModal
        && (
          <TodoModal
            closeModal={closeTodoModal}
            todo={selectedTodo}
          />
        )}
    </>
  );
};
