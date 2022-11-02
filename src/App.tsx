import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';
import { Todo } from './types/Todo';

import { Status } from './types/types';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [statusSelect, setStatusSelect] = useState('all');

  const onTodoSelection = (todoId: number) => {
    setSelectedTodo(todos.find(todo => todo.id === todoId) || null);
  };

  const handleModalClose = () => {
    setSelectedTodo(null);
  };

  const searchByInput = (todoTitle: string, searchInput: string) => {
    return todoTitle.toLowerCase().includes(searchInput.toLowerCase());
  };

  useEffect(() => {
    getTodos().then(todo => {
      setTodos(todo);
      setIsLoading(false);
    });
  }, []);

  const filteredTodos = todos.filter(({ title, completed }) => {
    switch (statusSelect) {
      case Status.ALL:
        return searchByInput(title, query);

      case Status.ACTIVE:
        return !completed && searchByInput(title, query);

      case Status.COMPLETED:
        return completed && searchByInput(title, query);

      default:
        throw new Error('Oops! Something went wrong!');
    }
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setStatusSelect={setStatusSelect}
                setQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onSelectedTodo={onTodoSelection}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} setClose={handleModalClose} />
      )}
    </>
  );
};
