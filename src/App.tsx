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
import { StatusSelector } from './types/StatusSelector';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectorStatus, setSelectorStatus] = useState(StatusSelector.ALL);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      });
  }, []);

  const visibleTodos = todos.filter(todo => {
    const normalizedTodo = todo.title.toLowerCase().trim().includes(searchQuery.toLowerCase());

    switch (selectorStatus) {
      case StatusSelector.ALL:
        return normalizedTodo;
      case StatusSelector.ACTIVE:
        return normalizedTodo && !todo.completed;
      case StatusSelector.COMPLETED:
        return normalizedTodo && todo.completed;
      default:
        throw new Error('Unknown status selector');
    }
  });

  const selectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const filteredSearchInput = (value: string) => {
    setSearchQuery(value);
  };

  const closeSelectedTodo = () => {
    setSelectedTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchQuery={searchQuery}
                onSearch={filteredSearchInput}
                onSelectStatus={setSelectorStatus}
              />
            </div>

            <div className="block">
              {todos.length > 0
                ? (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodo={selectedTodo}
                    onSelectTodo={selectTodo}
                  />
                ) : (
                  <Loader />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={closeSelectedTodo}
        />
      )}
    </>
  );
};
