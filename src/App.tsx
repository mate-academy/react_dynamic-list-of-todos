/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

const getFilteredTodos = (todos: Todo[], filterOption: string, query: string) => {
  const askedTodos = todos.filter(todo => {
    return todo.title.toLowerCase().includes(query.toLowerCase());
  });

  switch (filterOption) {
    case 'all':
      return askedTodos;
    case 'active':
      return askedTodos.filter(todo => !todo.completed);
    case 'completed':
      return askedTodos.filter(todo => todo.completed);
    default:
      return askedTodos;
  }
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosAreLoaded, setTodosAreLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedFilterOption, setSelectedFilterOption] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => (setTodosAreLoaded(true)
      ));
  }, []);

  const filteredTodos = useMemo(() => {
    return getFilteredTodos(todos, selectedFilterOption, query);
  }, [todos, selectedFilterOption, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterOption={selectedFilterOption}
                setFilter={setSelectedFilterOption}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {!todosAreLoaded && <Loader />}
              <TodoList
                todos={filteredTodos}
                showModal={setShowModal}
                selectedTodo={selectedTodo}
                selectTodo={setSelectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {showModal
        && (
          <TodoModal
            showModal={setShowModal}
            selectedTodo={selectedTodo}
            selectTodo={setSelectedTodo}
          />
        )}
    </>
  );
};
