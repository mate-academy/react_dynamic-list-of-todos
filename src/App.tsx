/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';

const getFilteredTodos = (
  param: string,
  query: string,
  todos: Todo[],
) => {
  let filteredTodos = [...todos];

  if (param === 'active') {
    filteredTodos = filteredTodos.filter(todo => !todo.completed);
  } else if (param === 'completed') {
    filteredTodos = filteredTodos.filter(todo => todo.completed);
  }

  if (query) {
    filteredTodos = filteredTodos
      .filter(todo => todo.title.toLocaleLowerCase()
        .includes(query.toLocaleLowerCase()));
  }

  return filteredTodos;
};

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(todos => setTodosFromServer(todos))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodo = getFilteredTodos(filter, query, todosFromServer);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setNewQuery={newQuery => setQuery(newQuery.toLowerCase())}
                setNewFilter={newFilter => setFilter(newFilter)}
                query={query}
                filter={filter}
              />
            </div>

            <div className="block">
              {isLoading
                  && <Loader />}
              {!isLoading
                && (
                  <TodoList
                    todos={filteredTodo}
                    selectedTodo={selectedTodo}
                    selectNewTodo={todo => setSelectedTodo(todo)}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo
        && (
          <TodoModal
            selectedTodo={selectedTodo}
            onSelectTodo={todo => setSelectedTodo(todo)}
          />
        )}
    </>
  );
};
