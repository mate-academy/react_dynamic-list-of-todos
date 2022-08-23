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
import { Maybe } from './types/Maybe';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Maybe<Todo>>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    getTodos()
      .then((todosFromServer) => {
        setTodos(todosFromServer);
        setIsLoading(false);
      });
  }, []);

  const filteredTodos = useMemo(() => (
    todos.filter(todo => {
      const filteredByQuery = todo.title.toLowerCase().includes(query.toLocaleLowerCase());

      if (filterType === 'all') {
        return filteredByQuery;
      }

      if (filterType === 'active') {
        return filteredByQuery && !todo.completed;
      }

      if (filterType === 'completed') {
        return filteredByQuery && todo.completed;
      }

      return true;
    })), [todos, query, filterType]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onSearch={setQuery}
                filterType={filterType}
                onSelect={setFilterType}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectTodo={setSelectedTodo}
                  selectedId={selectedTodo?.id || null}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal onClose={setSelectedTodo} selectedTodo={selectedTodo} />}
    </>
  );
};
