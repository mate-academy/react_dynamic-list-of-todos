/* eslint-disable max-len */
import {
  FC, useEffect, useMemo, useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { ComplitedFilter } from './types/ComplitedFilter';
import './App.css';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [complitedFilter, setComplitedFilter] = useState<ComplitedFilter>(ComplitedFilter.All);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const selectedTodo = useMemo(() => (
    todos.find(todo => todo.id === selectedTodoId) || null
  ), [todos, selectedTodoId]);

  const filteredTodosBySearchQuery = useMemo(() => (
    todos.filter(todo => {
      const prepTitle = todo.title.toLowerCase();
      const prepSearchQuery = searchQuery.toLowerCase();

      return prepTitle.includes(prepSearchQuery);
    })), [todos]);

  const filteredTodos = useMemo(() => {
    return filteredTodosBySearchQuery.filter(todo => {
      switch (complitedFilter) {
        case ComplitedFilter.All:
          return true;
        case ComplitedFilter.Active:
          return !todo.completed;
        case ComplitedFilter.Completed:
          return todo.completed;
        default:
          return true;
      }
    });
  }, [complitedFilter, searchQuery, todos]);

  const errorNoTodosFromServer = !isLoading && todos.length === 0 && !searchQuery;
  const errorNoSuchTodosBySearchQuery = !isLoading && filteredTodos.length === 0 && searchQuery;

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                complitedFilter={complitedFilter}
                setComplitedFilter={setComplitedFilter}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (
                  <TodoList
                    filteredTodos={filteredTodos}
                    selectedTodoId={selectedTodoId}
                    setSelectedTodoId={setSelectedTodoId}
                  />
                )}

              {errorNoTodosFromServer && (
                <h1>No results found</h1>
              )}

              {errorNoSuchTodosBySearchQuery && (
                <h1>{`No results found for "${searchQuery}" and filtered by "${complitedFilter}"`}</h1>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId && selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodoId={setSelectedTodoId}
        />
      )}

    </>
  );
};
