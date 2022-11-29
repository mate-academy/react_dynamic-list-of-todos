/* eslint-disable max-len */
import React, { useEffect, useState, useMemo } from 'react';
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
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedOption, setSelectedOption] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadTodos = async () => {
      const data = await getTodos();

      setTodos(data);
    };

    loadTodos();
  }, []);

  const handleSelect = (selectedTodoId: number) => {
    const selected = todos.find(({ id }) => id === selectedTodoId);

    if (selected) {
      setSelectedTodo(selected);
    }
  };

  const handleClose = () => {
    setSelectedTodo(null);
  };

  const visibleTodos = useMemo(() => {
    return (todos.filter(todo => {
      const query = searchQuery.toLowerCase();

      switch (selectedOption) {
        case 'All':
          return todo.title.toLowerCase().includes(query);

        case 'active':
          return !todo.completed && todo.title.toLowerCase().includes(query);

        case 'completed':
          return todo.completed && todo.title.toLowerCase().includes(query);

        default:
          return todo.title.toLowerCase().includes(query);
      }
    }));
  }, [selectedOption, searchQuery, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>

            <div className="block">
              {todos.length === 0 ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  onSelect={handleSelect}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          onClose={handleClose}
          todo={selectedTodo}
        />
      )}
    </>
  );
};
