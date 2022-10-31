/* eslint-disable max-len */
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

enum FilterOptions {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedTodo, setselectedTodo] = useState<Todo | null>(null);
  const [filterType, setFilterType] = useState('all');

  const filterTodos = () => {
    const visibleTodos = todos.filter(todo => (
      todo.title.toLowerCase().includes(query.toLowerCase())
    )).filter(todo => {
      switch (filterType) {
        case FilterOptions.ACTIVE:
          return !todo.completed;

        case FilterOptions.COMPLETED:
          return todo.completed;

        default:
          return todo;
      }
    });

    return visibleTodos;
  };

  const getTodosFromServer = async () => {
    try {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
      setIsLoaded(true);
    } catch (error) {
      throw new Error('Todos are not found');
    }
  };

  getTodosFromServer();

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                filterType={filterType}
                setFilterType={setFilterType}
              />
            </div>

            <div className="block">
              {isLoaded
                ? (
                  <TodoList
                    todos={filterTodos()}
                    selectedTodo={selectedTodo}
                    setSelectedTodo={setselectedTodo}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          setselectedTodo={setselectedTodo}
        />
      )}
    </>
  );
};
