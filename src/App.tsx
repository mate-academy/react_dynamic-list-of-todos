import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [filterBy, setFilterBy] = useState(Filter.All);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(serverTodos => {
        setTodos(serverTodos);
      })
      .catch(error => {
        throw new Error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredTodos = useMemo(() => (
    todos
      .filter(todo => {
        switch (filterBy) {
          case Filter.Active:
            return !todo.completed;
          case Filter.Completed:
            return todo.completed;
          case Filter.All:
          default:
            return true;
        }
      })
      .filter(todo => {
        return todo.title.toLowerCase().includes(query.toLowerCase());
      })
  ), [query, filterBy, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={setQuery}
                filterBy={filterBy}
                onFilterByChange={setFilterBy}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  setSelectedTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
