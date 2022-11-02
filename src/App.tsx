import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';

import { Todo } from './types/Todo';
import { TodoStatus } from './types/TodoStatus';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [status, setStatus] = useState<TodoStatus>(TodoStatus.ALL);
  const [query, setQuery] = useState('');

  const getTodosFromServer = async () => {
    setTodos(await getTodos());
    setIsLoaded(true);
  };

  const selectTodo = (todo: Todo | null) => {
    setSelectedTodo(todo);
  };

  const selectStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value as TodoStatus);
  };

  const getQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const resetQuery = () => {
    setQuery('');
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  const getFilteredTodos = () => {
    const filteredTodos = todos.filter(todo => {
      const lowerTitle = todo.title.toLowerCase();
      const lowerQuery = query.toLowerCase();

      return lowerTitle.includes(lowerQuery);
    });

    switch (status) {
      case TodoStatus.ALL:
        return filteredTodos.filter(todo => todo);

      case TodoStatus.ACTIVE:
        return filteredTodos.filter(todo => !todo.completed);

      case TodoStatus.COMPLETED:
        return filteredTodos.filter(todo => todo.completed);

      default:
        return filteredTodos.filter(todo => todo);
    }
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                selectStatus={selectStatus}
                query={query}
                getQuery={getQuery}
                resetQuery={resetQuery}
              />
            </div>

            <div className="block">
              {!isLoaded
                ? <Loader />
                : (
                  <TodoList
                    todos={getFilteredTodos()}
                    selectTodo={selectTodo}
                    selectedTodo={selectedTodo}
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
            selectTodo={selectTodo}
          />
        )}
    </>
  );
};
