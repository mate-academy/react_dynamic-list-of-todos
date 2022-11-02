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
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterSelection, setFilterSelection] = useState('all');
  const [query, setQuery] = useState('');
  // const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => (
        setTodos(todosFromServer)
      ));
  }, []);

  const onModalClose = () => setSelectedTodo(null);

  const filterTodos = () => {
    const queriedTodos = todos.filter(({ title }) => {
      const loweredTitle = title.toLowerCase();
      const loweredQuery = query.toLowerCase();

      return loweredTitle.includes(loweredQuery);
    });

    return queriedTodos.filter(todo => {
      switch (filterSelection) {
        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;

        default:
          return todo;
      }
    });
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterSelection={filterSelection}
                setFilterSelection={setFilterSelection}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {todos.length === 0 && <Loader />}
              <TodoList
                todos={filterTodos()}
                selectedTodo={selectedTodo}
                setSelectedTodo={setSelectedTodo}
              />
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onModalClose={onModalClose}
        />
      )}
    </>
  );
};
