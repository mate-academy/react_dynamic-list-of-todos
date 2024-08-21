/* eslint-disable max-len */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
// import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const filteredTodo = useMemo(() => {
    let filtered = todos;

    switch (selectedFilter) {
      case 'All':
        break;

      case 'active':
        filtered = todos.filter(todo => !todo.completed);
        break;

      case 'completed':
        filtered = todos.filter(todo => todo.completed);
        break;

      default:
        break;
    }

    if (searchTerm) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    return filtered;
  }, [todos, selectedFilter, searchTerm]);

  const onCloseHandler = useCallback(() => {
    setSelectedTodo(null);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
              />
            </div>
            <div className="block">
              {todos.length > 0 ? (
                <TodoList
                  todos={filteredTodo}
                  setSelectedTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={onCloseHandler} />
      )}
    </>
  );
};
