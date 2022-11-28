/* eslint-disable max-len */
import React, { useEffect, useState, useCallback } from 'react';
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

  const loadTodos = useCallback(async () => {
    const data = await getTodos();

    if (data.length !== 0) {
      setTodos(data);
    }
  }, []);

  useEffect(() => {
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

  const handleOptionFilter = (option: string): Todo[] => {
    switch (option) {
      case 'All':
        return todos;

      case 'active':
        return todos.filter(todo => !todo.completed);

      case 'completed':
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  };

  const handleSearchFilter = (optionFilteredTodos: Todo[], query: string) => {
    return optionFilteredTodos.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
  };

  const filteredOptionTodos = handleOptionFilter(selectedOption);
  const visibleTodos = handleSearchFilter(filteredOptionTodos, searchQuery);

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
              {!todos ? (
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
