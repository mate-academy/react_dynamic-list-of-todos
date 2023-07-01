import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { StatusFilter } from './types/StatusFilter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectorStatus, setSelectorStatus] = useState(StatusFilter.ALL);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setIsLoading(false);
      })
      .catch(error => {
        throw new Error('Loading todos error:', error.message);
      });
  }, []);

  const visibleTodos = todos.filter(todo => {
    const normalizedTodo
    = todo.title.toLowerCase().trim().includes(searchQuery.toLowerCase());

    switch (selectorStatus) {
      case StatusFilter.ALL:
        return normalizedTodo;
      case StatusFilter.ACTIVE:
        return normalizedTodo && !todo.completed;
      case StatusFilter.COMPLETED:
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
              {isLoading
                ? (
                  <Loader />
                ) : (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodo={selectedTodo}
                    onSelectTodo={selectTodo}
                  />
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
