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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedTodo, setSelectedTodo] = useState('all');
  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(t => {
        setTodos(t);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleSelectTodo = (value: string) => {
    setSelectedTodo(value);
  };

  const handleSelectTodoForModal = (id: number) => {
    setSelectedTodoId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTodoId(null);
  };

  const filteredTodos = todos
    .filter(todo =>
      selectedTodo === 'all'
        ? true
        : selectedTodo === 'completed'
          ? todo.completed
          : !todo.completed,
    )
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={setQuery}
                onFilterChange={handleSelectTodo}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodoId}
                  onSelectTodo={handleSelectTodoForModal}
                />
              )}
              {error && <p className="has-text-danger">{error}</p>}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <TodoModal
          todo={todos.find(todo => todo.id === selectedTodoId) || null}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
