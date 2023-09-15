import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo, TodoWithUser } from './types/Todo';
import { getTodos, getUser } from './api';
import { filterTodos } from './helpers';
import { FilterOptions } from './types/FilterOptions';
import { DEFAULT_FILTER } from './constants';

export const App: React.FC = () => {
  const [isTodosLoading, setIsTodosLoading] = useState(true);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [modalIsActive, setModalIsActive] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<TodoWithUser | null>(null);
  // eslint-disable-next-line max-len
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(DEFAULT_FILTER);

  useEffect(() => {
    getTodos()
      .then(setVisibleTodos)
      .finally(() => {
        setIsTodosLoading(false);
      });
  }, []);

  useEffect(() => {
    setIsTodosLoading(true);
    getTodos()
      .then((todos) => {
        const filtered = filterTodos(todos, filterOptions);

        setVisibleTodos(filtered);
      })
      .finally(() => {
        setIsTodosLoading(false);
      });
  }, [filterOptions]);

  // eslint-disable-next-line max-len
  const handleFilterTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterOptions((prevState) => (
      {
        ...prevState,
        filterType: event.target.value,
      }));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterOptions((prevState) => (
      {
        ...prevState,
        query: event.target.value,
      }
    ));
  };

  const handleResetInput = () => {
    setFilterOptions((prevState) => (
      {
        ...prevState,
        query: '',
      }
    ));
  };

  const handleTodoSelection = (todo: Todo) => {
    setModalIsActive(true);

    getUser(todo.userId)
      .then(userFounded => {
        setSelectedTodo(
          {
            ...todo,
            user: userFounded,
          },
        );
      });
  };

  const handleModalClosing = () => {
    setModalIsActive(false);
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
                onSearch={handleInputChange}
                onTypeChange={handleFilterTypeChange}
                onReset={handleResetInput}
                query={filterOptions.query}
              />
            </div>

            <div className="block">
              {isTodosLoading
                ? (
                  <Loader />
                ) : (
                  <TodoList
                    todos={visibleTodos}
                    onSelect={handleTodoSelection}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {modalIsActive && (
        <TodoModal
          todo={selectedTodo}
          onClose={handleModalClosing}
        />
      )}
    </>
  );
};
