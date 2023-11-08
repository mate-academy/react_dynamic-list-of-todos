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
import { TodosFilter } from './types/TodosFilter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<TodosFilter>(TodosFilter.all);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsShown, setModalIsShown] = useState(false);
  const [todoModalId, setTodoModalId] = useState(0);

  const filteredTodos = (todosToFilter: Todo[]) => {
    return todosToFilter.filter((todo) => {
      const titleMatch = todo.title
        .toLowerCase()
        .includes(query.trim().toLowerCase());

      switch (selectedFilter) {
        case 'active':
          return titleMatch && !todo.completed;
        case 'completed':
          return titleMatch && todo.completed;
        default:
          return titleMatch;
      }
    });
  };

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(todosList => {
        setTodos(filteredTodos(todosList));
      })
      .catch((e) => {
        throw new Error(e);
      })
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, selectedFilter]);

  const handleShowModalClick = (todoId: number) => {
    setModalIsShown(true);
    setTodoModalId(todoId);
  };

  const handleHideModalClick = () => {
    setModalIsShown(false);
    setTodoModalId(0);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setSelectedFilter={setSelectedFilter}
                setQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todos}
                  todoModalId={todoModalId}
                  handleShowModalClick={handleShowModalClick}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {modalIsShown && (
        <TodoModal
          todos={todos}
          todoModalId={todoModalId}
          handleHideModalClick={handleHideModalClick}
        />
      )}
    </>
  );
};
