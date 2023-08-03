/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { SortingStatus } from './types/sortingStatus';

function filterTodos(todos: Todo[], sortingStatus: string, query: string) {
  const serachingQuery = query.trim().toLowerCase();
  const todoWithQuery = todos.filter(todo => (
    todo.title.toLowerCase().includes(serachingQuery)
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
  const [sortingStatus, setSortingStatus] = useState(SortingStatus.All);
  const [query, setQuery] = useState('');

  const filteredTodos = useMemo(() => {
    return filterTodos(todos, sortingStatus, query);
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
              {isLoading
                ? (
                  <Loader />
                )
                : (
                  <TodoList
                    todos={filteredTodos}
                    onSelect={setSelectedTodoId}
                    selectedTodoId={selectedTodoId}
                  />
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
