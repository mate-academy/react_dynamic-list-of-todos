/* eslint-disable max-len */
import React, { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo, Status } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [titleFilter, setTitleFilter] = useState<string>('');
  const [filter, setFilter] = useState<Status>(Status.ALL);

  const handleSelectedTodo = (todo: Todo) => {
    const findTodo = todos.find(value => value === todo);

    if (findTodo) {
      setSelectedTodo(findTodo);
    }
  };

  const handleModalClose = () => {
    setSelectedTodo(null);
  };

  const handleFilter = (status: Status) => {
    setFilter(status);
  };

  const handleTitleFilter = (title: string) => {
    setTitleFilter(title.toLowerCase());
  };

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filter) {
        case Status.ALL:
          return true;
        case Status.ACTIVE:
          return !todo.completed;
        case Status.COMPLETED:
          return todo.completed;
        default:
          return true;
      }
    }).filter(todo => todo.title.toLowerCase().includes(titleFilter));
  }, [todos, filter, titleFilter]);

  const handleClearFilter = () => {
    setTitleFilter('');
    setFilter(Status.ALL);
  };

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(error => {
        /* eslint-disable-next-line */
        console.error('Error fetching todos:', error);
      })
      .finally(() => setIsLoading(true));
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
              {!isLoading && <Loader />}
              <TodoList
                todos={visibleTodos}
                handleSelectedTodo={handleSelectedTodo}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal todo={selectedTodo} handleModalClose={handleModalClose} />}
    </>
  );
};
