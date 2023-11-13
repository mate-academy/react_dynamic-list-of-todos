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
import { Filter } from './types/Filter';

const handleFilterLogic = (filter: Filter, todo: Todo, filterByTitle: string) => {
  if (filter === 'all') {
    return todo.title.toLowerCase().includes(filterByTitle);
  }

  if (filter === 'completed') {
    return todo.completed && todo.title.toLowerCase().includes(filterByTitle);
  }

  if (filter === 'active') {
    return !todo.completed && todo.title.toLowerCase().includes(filterByTitle);
  }

  return todo.title.toLowerCase().includes(filterByTitle);
};

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | undefined>(undefined);
  const [filterByTitle, setFilterByTitle] = useState<string>('');
  const [filter, setFilter] = useState<Filter>('all');

  const selectTodos = (todo: Todo) => {
    const foundTodo = todos.find(value => value === todo);

    setSelectedTodo(foundTodo);
  };

  const handleModalClose = () => {
    setSelectedTodo(undefined);
  };

  const handleSelectFilter = (filterBy: Filter) => {
    setFilter(filterBy);
  };

  const handleTitleFilter = (title: string) => {
    setFilterByTitle(title.toLowerCase());
  };

  const handleClearFilter = () => {
    setFilterByTitle('');
    setFilter('all');
  };

  const visibleTodos = todos.filter(todo => handleFilterLogic(filter, todo, filterByTitle));

  useEffect(() => {
    getTodos().then(setTodos).finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilter={handleSelectFilter}
                onTitleFilter={handleTitleFilter}
                onClearFilter={handleClearFilter}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    handleSelectedTodo={selectTodos}
                    selectedTodo={selectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal todo={selectedTodo} handleModalClose={handleModalClose} />}
    </>
  );
};
