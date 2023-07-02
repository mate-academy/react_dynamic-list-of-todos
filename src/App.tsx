/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterBy, setFilterBy] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setIsLoaded(true);
      });
  }, []);

  const filterTodos = (
    allTodos:Todo[],
    completionStatus:string,
    searchInput: string,
  ) => {
    let filteredByStatusTodos = [...allTodos];

    switch (completionStatus) {
      case 'all':
        break;
      case 'active':
        filteredByStatusTodos = filteredByStatusTodos.filter(todo => !todo.completed);
        break;
      case 'completed':
        filteredByStatusTodos = filteredByStatusTodos.filter(todo => todo.completed);
        break;
      default:
        throw new Error();
    }

    const normalizedQuery = searchInput.trim().toLowerCase();

    return filteredByStatusTodos
      .filter(todo => todo.title
        .trim()
        .toLowerCase()
        .includes(normalizedQuery));
  };

  const visibleTodos = filterTodos(todos, filterBy, searchQuery);

  const selectTodo = (todo: Todo | null) => {
    setSelectedTodo(todo);
  };

  const unselectTodo = () => {
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
                filterBy={filterBy}
                setFilterBy={setFilterBy}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>

            <div className="block">
              {isLoaded
                ? (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodo={selectedTodo}
                    onSelect={selectTodo}
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
          onClose={unselectTodo}
        />
      )}
    </>
  );
};
