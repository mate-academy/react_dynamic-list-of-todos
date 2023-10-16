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
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [titleFilter, setTitleFilter] = useState('');
  const [filter, setFilter] = useState(Status.all);

  const handleSelectedTodo = (todo: Todo) => {
    const findTodo = todos.find(value => value === todo) as Todo;

    setSelectedTodo(findTodo);
  };

  const handleModalClose = () => {
    setSelectedTodo(null);
  };

  const handleFilter = () => {
    switch (filter) {
      case Status.active:
        return setFilter(Status.active);

      case Status.completed:
        return setFilter(Status.completed);

      default:
        return Status.all;
    }
  };

  const handleTitleFilter = (title: string) => {
    setTitleFilter(title.toLowerCase());
  };

  const visibleTodos = todos.filter(todo => {
    if (Status.all) {
      return todo.title.toLowerCase().includes(titleFilter);
    }

    if (Status.completed) {
      return todo.completed && todo.title.toLowerCase().includes(titleFilter);
    }

    if (Status.active) {
      return !todo.completed && todo.title.toLowerCase().includes(titleFilter);
    }

    return todo.title.toLowerCase().includes(titleFilter);
  });

  const handleClearFilter = () => {
    setTitleFilter('');
    setFilter(Status.all);
  };

  useEffect(() => {
    getTodos().then(setTodos).finally(() => setIsLoaded(true));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilter={handleFilter}
                onTitleFilter={handleTitleFilter}
                onClearFilter={handleClearFilter}
              />
            </div>

            <div className="block">
              {!isLoaded && <Loader />}
              <TodoList
                todos={visibleTodos}
                handleSelectedTodo={handleSelectedTodo}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo !== null && <TodoModal todo={selectedTodo} handleModalClose={handleModalClose} />}
    </>
  );
};
