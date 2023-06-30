/* eslint-disable max-len */
import React, { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { getFilteredTodos } from './helpers';
import { TodoStatus } from './types/TodoStatus';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState<string>('');
  const [status, setStatus] = useState<TodoStatus>(TodoStatus.All);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setIsLoading(false);
      })
      .catch((error) => {
        throw new Error(`Error fetching todos from server: ${error}`);
      });
  }, []);

  const inputQuery = (value: string) => {
    setQuery(value);
  };

  const selectStatus = (todoStatus: TodoStatus) => {
    setStatus(todoStatus);
  };

  const selectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const clearSelectedTodo = () => {
    setSelectedTodo(null);
  };

  const visibleGoods = useMemo(() => {
    return getFilteredTodos(todos, query, status);
  }, [query, status, todos]);

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
                onInputQuery={inputQuery}
                onSelectStatus={selectStatus}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (

                  <TodoList
                    todos={visibleGoods}
                    onSelectTodo={selectTodo}
                    selectedTodo={selectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onClearForm={clearSelectedTodo}
        />
      )}
    </>
  );
};
