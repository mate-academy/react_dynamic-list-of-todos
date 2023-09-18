/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { SortingStatus } from './types/sortingStatus';
import { getTodos } from './api';

function getFilteredTodos(todos: Todo[], sortingStatus: string, query: string) {
  const searchingQuery = query.trim().toLowerCase();
  const todoWithQuery = todos.filter(todo => (
    todo.title.toLowerCase().includes(searchingQuery)
  ));

  return todoWithQuery.filter(todo => {
    switch (sortingStatus) {
      case SortingStatus.Active:
        return !todo.completed;

      case SortingStatus.Completed:
        return todo.completed;

      default:
        return true;
    }
  });
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [sortingStatus, setSortingStatus] = useState<SortingStatus>(SortingStatus.All);
  const [query, setQuery] = useState('');

  const filteredTodos = useMemo(() => {
    return getFilteredTodos(todos, sortingStatus, query);
  }, [todos, sortingStatus, query]);

  const selectedTodo = filteredTodos.find(todo => todo.id === selectedTodoId) || null;

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .then(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQuery={setQuery}
                onStatus={setSortingStatus}
              />
            </div>

            <div className="block">
              {isLoading && (
                <Loader />
              )}

              {!isLoading && filteredTodos.length > 0 && ((
                <TodoList
                  todos={filteredTodos}
                  onSelect={setSelectedTodoId}
                  selectedTodo={selectedTodoId}
                />
              )
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onSelect={(todoId: null) => setSelectedTodoId(todoId)}
        />
      )}
    </>
  );
};
