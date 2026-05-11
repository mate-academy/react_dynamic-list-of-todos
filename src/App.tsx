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
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(data => {
        setTodos(data);
        setFilteredTodos(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter todos={todos} onFilter={setFilteredTodos} />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={filteredTodos}
                onSelectTodo={handleSelectTodo}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        selectedTodo={selectedTodo}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTodo(null);
        }}
      />
    </>
  );
};
