/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

export type Filter = 'all' | 'completed' | 'active';

export const App: React.FC = () => {
  const [filterTodos, setFilterTodos] = useState<Filter>('all');
  const [isLoaded, setIsLoaded] = useState(false);
  const [toDoList, setToDoList] = useState<Todo[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [singleToDo, setSingleTodo] = useState<Todo | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  useEffect(() => {
    getTodos()
      .then(setToDoList)
      .finally(() => setIsLoaded(true));
  }, []);

  const handleFilterChange = (filter: Filter) => {
    setFilterTodos(filter);
  };

  const handleTodoSelect = (Id: number, todo: Todo) => {
    setIsOpen(true);
    setSingleTodo(todo);
    setSelectedTodoId(todo.id);
    setUser(null); // Reset user when opening modal
    getUser(Id).then(setUser);
  };

  const handleModalClose = () => {
    setIsOpen(false);
    setSingleTodo(null);
    setSelectedTodoId(null);
    setUser(null);
  };

  const handleTodoDeselect = () => {
    setSelectedTodoId(null);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filterTodos}
                onFilterChange={handleFilterChange}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
              />
            </div>

            <div className="block">
              {!isLoaded && <Loader />}
              <TodoList
                todos={toDoList}
                filter={filterTodos}
                onTodoSelect={handleTodoSelect}
                searchQuery={searchQuery}
                selectedTodoId={selectedTodoId}
                onTodoDeselect={handleTodoDeselect}
              />
            </div>
          </div>
        </div>
      </div>
      {isOpen && singleToDo && (
        <TodoModal onClose={handleModalClose} user={user} todo={singleToDo} />
      )}
    </>
  );
};
