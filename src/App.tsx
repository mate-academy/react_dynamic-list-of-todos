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

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Try again later'))
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = todos.filter(todo => {
      if (filter === 'completed') {
        return todo.completed;
      }
      if (filter === 'active') {
        return !todo.completed;
      }
      return true;
    })
    .filter(todo => todo.title.toLowerCase().includes(searchValue.toLowerCase()));

  return (
    <div className="section">
      <div className="container">
        <div className="box">
          <h1 className="title">Todos:</h1>

          <div className="block">
            <TodoFilter
              filter={filter}
              setFilter={setFilter}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
          </div>

          <div className="block">
            {loading ? (
              <Loader />
            ) : (
              <TodoList
                todos={filteredTodos}
                onSelect={setSelectedTodo}
                selectedTodoId={selectedTodo ? selectedTodo.id : null}
              />
            )}
            {errorMessage && <p className="has-text-danger">{errorMessage}</p>}
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal todo={selectedTodo} onClose={() => setSelectedTodo(null)} />}
    </div>
  );
};
