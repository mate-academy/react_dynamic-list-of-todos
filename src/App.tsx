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

export const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [titleFilter, setTitleFilter] = useState<string>('');
  const [filter, setFilter] = useState<string>('');

  const handleSelectedTodo = (todo: Todo) => {
    const findTodo = todos.find(value => value === todo) as Todo;

    setSelectedTodo(findTodo);
  };

  const handleModalClose = () => {
    setSelectedTodo(null);
  };

  const handleFilter = (status: string) => {
    if (status === 'all') {
      setFilter('all');
    } else if (status === 'completed') {
      setFilter('completed');
    } else if (status === 'active') {
      setFilter('active');
    }
  };

  const handleTitleFilter = (title: string) => {
    setTitleFilter(title.toLowerCase());
  };

  const visibleTodos = todos.filter(todo => {
    if (filter === 'all') {
      return todo.title.toLowerCase().includes(titleFilter);
    }

    if (filter === 'completed') {
      return todo.completed && todo.title.toLowerCase().includes(titleFilter);
    }

    if (filter === 'active') {
      return !todo.completed && todo.title.toLowerCase().includes(titleFilter);
    }

    return todo.title.toLowerCase().includes(titleFilter);
  });

  const handleClearFilter = () => {
    setTitleFilter('');
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
