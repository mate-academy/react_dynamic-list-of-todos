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
import { OptionForFilterTodos } from './types/OptionForFilterTodos';
import './App.css';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [optionForFilter, setOptionForFilter] = useState<OptionForFilterTodos>(OptionForFilterTodos.All);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const selectedTodo = useMemo(() => (
    todos.find(todo => todo.id === selectedTodoId) || null
  ), [todos, selectedTodoId]);

  const filteredTodosBySearchQuery = todos.filter(todo => {
    const prepTitle = todo.title.toLowerCase();
    const prepSearchQuery = searchQuery.toLowerCase();

    return prepTitle.includes(prepSearchQuery);
  });

  const filteredTodos = useMemo(() => {
    return filteredTodosBySearchQuery.filter(todo => {
      switch (optionForFilter) {
        case OptionForFilterTodos.All:
          return true;
        case OptionForFilterTodos.Active:
          return !todo.completed;
        case OptionForFilterTodos.Completed:
          return todo.completed;
        default:
          return true;
      }
    });
  }, [optionForFilter, searchQuery, todos]);

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
                optionForFilter={optionForFilter}
                setOptionForFilter={setOptionForFilter}
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
                <h1>{`No results found for "${searchQuery}" and filtered by "${optionForFilter}"`}</h1>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId && selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodoId={setSelectedTodoId}
          setOptionForFilter={setOptionForFilter}
        />
      )}

    </>
  );
};
