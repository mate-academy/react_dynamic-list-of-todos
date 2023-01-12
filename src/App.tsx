/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(todos => {
        setTodosFromServer(todos);
        setIsLoading(false);
      });
  }, []);

  const handleOpenModal = (id: number) => {
    const newSelectedTodo = todosFromServer.find(todo => todo.id === id) || null;

    setSelectedTodo(newSelectedTodo);
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
  };

  const visibleTodos = todosFromServer.filter(todo => {
    const firstCondition = todo.title
      .toLowerCase()
      .includes(query.toLowerCase());

    switch (filterType) {
      case 'all':
        return firstCondition;

      case 'active':
        return firstCondition && !todo.completed;

      case 'completed':
        return firstCondition && todo.completed;

      default:
        return true;
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
                filterType={filterType}
                onFilter={setFilterType}
                query={query}
                onChangeQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoading
                ? (<Loader />)
                : (
                  <TodoList
                    todos={visibleTodos}
                    setIsClicked={handleOpenModal}
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
            todo={selectedTodo}
            onClose={handleCloseModal}
          />
        )}
    </>
  );
};
