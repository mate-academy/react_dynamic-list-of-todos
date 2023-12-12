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
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [todoStatus, setTodoStatus] = useState('all');

  const loadedTodos = async () => {
    setAllTodos(await getTodos());
  };

  useEffect(() => {
    loadedTodos();
  }, []);

  const visibleTodos = allTodos
    .filter(todo => todo.title.toLowerCase().includes(query))
    .filter(todo => {
      switch (todoStatus) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
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
                query={query}
                onSetQuery={setQuery}
                todoStatus={todoStatus}
                onSetStatus={setTodoStatus}
              />
            </div>

            <div className="block">
              {allTodos.length === 0 && (
                <Loader />
              )}

              <TodoList
                todos={visibleTodos}
                selectedTodo={selectedTodo}
                setSelectedTodo={setSelectedTodo}
                onClose={setIsModalOpen}
              />
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && isModalOpen && (
        <TodoModal
          todo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
          onClose={setIsModalOpen}
        />
      )}
    </>
  );
};
