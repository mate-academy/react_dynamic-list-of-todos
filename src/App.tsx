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
  const [todoFromServer, setTodoFromServer] = useState<Todo[]>([]);
  const [areUsersLoaded, setLoadingStatus] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(todos => {
        setTodoFromServer(todos);
        setLoadingStatus(true);
      });
  }, []);

  const handleClean = () => {
    setQuery('');
  };

  const handleTodoSelect = (id: number) => {
    const newSelectedTodo = todoFromServer.find(todo => todo.id === id) || null;

    setSelectedTodo(newSelectedTodo);
  };

  const handleTodoClose = () => {
    setSelectedTodo(null);
  };

  const visibleTodos = todoFromServer.filter(todo => {
    const condition1 = todo.title
      .toLowerCase()
      .includes(query.toLowerCase());

    switch (filterType) {
      case 'all':
        return condition1;
      case 'active':
        return condition1 && !todo.completed;
      case 'completed':
        return condition1 && todo.completed;
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
                onSearch={setQuery}
                onClean={handleClean}
              />
            </div>

            <div className="block">
              {
                areUsersLoaded
                  ? (
                    <TodoList
                      todos={visibleTodos}
                      onSelect={handleTodoSelect}
                      selectedId={selectedTodo?.id || 0}
                    />
                  )
                  : <Loader />
              }
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal selectedTodo={selectedTodo} onClose={handleTodoClose} />}
    </>
  );
};
