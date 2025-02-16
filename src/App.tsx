/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
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
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [isLoadingTodos, setIsLoadingTodos] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setIsLoadingTodos(true);
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setFilteredTodos(todosFromServer);
      })
      .finally(() => setIsLoadingTodos(false));
  }, []);

  useEffect(() => {
    let filtered = todos;

    if (filterStatus !== 'all') {
      filtered = todos.filter(todo =>
        filterStatus === 'completed' ? todo.completed : !todo.completed,
      );
    }

    if (query) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    setFilteredTodos(filtered);
  }, [todos, filterStatus, query]);

  const handleSelectTodo = (todoId: number | null) => {
    setSelectedTodoId(todoId);
  };

  const closeModal = () => {
    setSelectedTodoId(null);
  };

  const selectedTodo = todos.find(todo => todo.id === selectedTodoId);

  return (
    <div className="section">
      <div className="container">
        <div className="box">
          <h1 className="title">Todos:</h1>

          <div className="block">
            <TodoFilter
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              query={query}
              setQuery={setQuery}
            />
          </div>

          <div className="block">
            {isLoadingTodos ? (
              <Loader />
            ) : (
              <TodoList
                todos={filteredTodos}
                selectedTodo={selectedTodoId}
                setSelectedTodo={handleSelectTodo}
              />
            )}
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} closeModal={closeModal} />
      )}
    </div>
  );
};
