/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTodoId, setActiveTodoId] = useState<number | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const handleTodoClick = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleIconClick = (todoId: number) => {
    setActiveTodoId(prevId => (prevId === todoId ? null : todoId));
  };

  const handleClose = () => {
    setSelectedTodo(null);
    setActiveTodoId(null);
  };

  const filteredTodos = todos.filter(todo => {
    const searchedTodos = todo.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    if (!searchedTodos) {
      return false;
    }

    if (filterStatus === 'completed') {
      return todo.completed;
    }

    if (filterStatus === 'active') {
      return !todo.completed;
    }

    return true;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchQuery={searchQuery}
                setFilterStatus={setFilterStatus}
                setSearchQuery={setSearchQuery}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && (
                <TodoList
                  todos={filteredTodos}
                  handleTodoClick={handleTodoClick}
                  activeTodoId={activeTodoId}
                  handleIconClick={handleIconClick}
                  handleClose={handleClose}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} handleClose={handleClose} />
      )}
    </>
  );
};
