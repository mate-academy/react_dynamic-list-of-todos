/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';

import { normalize } from './helpers/normalize';

import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setIsLoaded(true);
      });
  }, []);

  const selectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const clearSelectedTodo = () => {
    setSelectedTodo(null);
  };

  const filterQuery = (value: string) => {
    setQuery(value);
  };

  const selectStatus = (value: string) => {
    setStatus(value);
  };

  const visibleTodos = todos.filter((todo) => {
    const normalizedQuery = normalize(query);
    const normalizedTodo = normalize(todo.title);

    const isTodoIncluded = normalizedTodo.includes(normalizedQuery);

    let isStatusMatch: boolean;

    switch (status) {
      case 'active':
        isStatusMatch = !todo.completed;
        break;

      case 'completed':
        isStatusMatch = todo.completed;
        break;

      default:
        isStatusMatch = true;
    }

    return isTodoIncluded && isStatusMatch;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <div className="block">
              <TodoFilter
                query={query}
                status={status}
                onFilter={filterQuery}
                onSelectStatus={selectStatus}
              />
            </div>

            <div className="block">
              {isLoaded
                ? (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodo={selectedTodo}
                    onSelect={selectTodo}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={clearSelectedTodo}
        />
      )}
    </>
  );
};
