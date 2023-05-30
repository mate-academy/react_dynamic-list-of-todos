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
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const selectTodo = (todoId: number) => {
    setSelectedTodo(todos.find(todo => todo.id === todoId) || null);
  };

  const closeModal = () => setSelectedTodo(null);

  const filterTodos = () => {
    const cleanQuery = query.trim().toLowerCase();

    return todos.filter(todo => {
      switch (filterType) {
        case 'active':
          return !todo.completed && todo.title.toLowerCase().includes(cleanQuery);
        case 'completed':
          return todo.completed && todo.title.toLowerCase().includes(cleanQuery);
        default:
          return todo.title.toLowerCase().includes(cleanQuery);
      }
    });
  };

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      });
  }, []);

  const todoList = (
    <TodoList
      selectedTodo={selectedTodo?.id || 0}
      onSelect={selectTodo}
      todos={filterTodos()}
    />
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                filterType={filterType}
                setQuery={setQuery}
                setFilterType={setFilterType}
              />
            </div>

            <div className="block">
              {
                todos.length
                  ? todoList
                  : <Loader />
              }
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          closeModal={closeModal}
        />
      )}
    </>
  );
};
