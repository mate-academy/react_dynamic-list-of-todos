/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const handleTodoClick = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const closeModal = () => {
    setSelectedTodo(null);
  };

  const filteredTodos = todos
    .filter(todo => {
      switch (selectedStatus) {
        case 'completed':
          return todo.completed;
        case 'active':
          return !todo.completed;
        default:
          return todo;
      }
    })
    .filter(todo =>
      todo.title.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()),
    );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedStatus={selectedStatus}
                searchQuery={searchQuery}
                onStatusChange={setSelectedStatus}
                onSearchChange={setSearchQuery}
                onClearSearch={() => setSearchQuery('')}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onTodoClick={handleTodoClick}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal todo={selectedTodo} onClose={closeModal} />}
    </>
  );
};
