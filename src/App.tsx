import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';

import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { FilterType } from './types/FilterTypes';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState<string>(FilterType.ALL);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch((error) => {
        throw new Error(error.message);
      });
  }, []);

  const closeSelectedTodoInfo = () => {
    setSelectedTodo(null);
  };

  const filteredTodos = useMemo(() => {
    let result = todos;

    switch (filterType) {
      case FilterType.ACTIVE:
        result = todos.filter(todo => !todo.completed);
        break;

      case FilterType.COMPLETED:
        result = todos.filter(todo => todo.completed);
        break;

      default:
        result = todos;
    }

    if (query) {
      return result.filter(
        (todo) => todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return result;
  }, [todos, filterType, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                filterType={filterType}
                setFilterType={setFilterType}
              />
            </div>

            <div className="block">
              {todos.length === 0 ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onCloseHandler={closeSelectedTodoInfo}
        />
      )}
    </>
  );
};
