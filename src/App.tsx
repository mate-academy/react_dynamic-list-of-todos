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

function filterBy(todos: Todo[], filter = '', query = '') {
  let currentFilteredTodos = [...todos];

  if (query.length !== 0) {
    currentFilteredTodos = currentFilteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  switch (filter) {
    case 'completed':
      currentFilteredTodos = currentFilteredTodos.filter(
        todo => todo.completed,
      );
      break;

    case 'active':
      currentFilteredTodos = currentFilteredTodos.filter(
        todo => !todo.completed,
      );
      break;
  }

  return currentFilteredTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo>();
  const [filter, setFilter] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(response => {
        setTodos(response);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = filterBy(todos, filter, query);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterBy={(filterInput, queryInput) => {
                  setFilter(filterInput);
                  setQuery(queryInput);
                }}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  onSelect={(id: number) => {
                    const foundTodo = todos.find(todo => todo.id === id);

                    if (foundTodo) {
                      setSelectedTodo(foundTodo);
                    }
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onClose={() => setSelectedTodo(undefined)}
        />
      )}
    </>
  );
};
