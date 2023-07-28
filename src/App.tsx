/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';

import { Todo } from './types/Todo';
import { Filter } from './types/Filter';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState(Filter.ALL);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then((todosFromServer) => {
        setTodos(todosFromServer);
      })
      .catch((error) => {
        throw new Error(error.message);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const visibleTodos = useMemo(() => {
    if (filter === Filter.ALL && query === '') {
      return todos;
    }

    return todos.filter((todo) => {
      const isTodoSuitable = todo.title
        .toLowerCase()
        .trim()
        .includes(query.toLowerCase().trim());

      switch (filter) {
        case Filter.ALL:
          return isTodoSuitable;

        case Filter.ACTIVE:
          return isTodoSuitable && !todo.completed;

        case Filter.COMPLETED:
          return isTodoSuitable && todo.completed;

        default:
          throw new Error('Unknown filter');
      }
    });
  }, [todos, query, filter]);

  const selectTodo = (

    todo: Todo,
  ) => {
    setSelectedTodo(todo);
  };

  const handleCloseTodo = () => {
    setSelectedTodo(null);
  };

  const handleInput = (value: string) => {
    setQuery(value);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                handleInput={handleInput}
                setFilter={setFilter}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  onSelectTodo={selectTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={handleCloseTodo} />
      )}
    </>
  );
};
