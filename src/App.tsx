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
import { Filters } from './types/Filters';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<Filters>(Filters.ALL);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  const [isLoadingTodos, setIsLoadingTodos] = useState(true);

  const filteredTodos = todos.filter(todo => {
    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());

    if (status === Filters.ALL) return matchesQuery;
    const matchesStatus = (status === Filters.COMPLETED ? todo.completed : !todo.completed);
    return matchesQuery && matchesStatus;
  })

  const selectedTodo = todos.find(todo => todo.id === selectedTodoId);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleReset = () => {
    setQuery('');
  };

  const handleOpenModal = (todo: Todo) => {
    setSelectedTodoId(todo.id);
  };

  const handleCloseModal = () => {
    setSelectedTodoId(null);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value as Filters);
  };

  useEffect(() => {
    setIsLoadingTodos(true);

    getTodos()
      .then(data => {
        setTodos(data);
      })
      .finally(() => setIsLoadingTodos(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                handleQueryChange={handleQueryChange}
                handleReset={handleReset}
                handleStatusChange={handleStatusChange}
              />
            </div>

            <div className="block">
              {isLoadingTodos && !todos.length ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodoId}
                  handleOpenModal={handleOpenModal}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodoId && selectedTodo && (
        <TodoModal todo={selectedTodo} handleCloseModal={handleCloseModal} />
      )}
    </>
  );
};
