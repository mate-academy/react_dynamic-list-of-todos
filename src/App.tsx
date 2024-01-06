import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Filter } from './types/Filter';
import { todosFilter } from './utils/todosFilter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<Todo | undefined>(undefined);
  const [sortBy, setSortBy] = useState(Filter.All);
  const [query, setQuery] = useState('');

  const fiteredTodos = todosFilter(todos, { sortBy, query });

  const getTodoList = () => {
    setIsLoading(true);

    getTodos()
      .then(res => {
        setTodos(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getTodoList();
  }, []);

  const onSetTodo = (id: number | undefined) => {
    if (id === undefined) {
      setCurrentTodo(undefined);

      return;
    }

    const selectedTodo = todos.find(todo => todo.id === id);

    setCurrentTodo(selectedTodo);
  };

  const handleQuery = (s: Filter) => {
    setSortBy(s);
  };

  const handleSearchValue = (q: string) => {
    setQuery(q);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleQuery={handleQuery}
                handleSearchValue={handleSearchValue}
                query={query}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={fiteredTodos}
                    selectTodo={onSetTodo}
                    selectedTodo={currentTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal
          todo={currentTodo}
          onCloseModal={onSetTodo}
        />
      )}
    </>
  );
};
