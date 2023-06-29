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
import { TodoStatus } from './types/TodoStatus';
import { FilterOptions } from './types/filterOptions';
import { getFilteredTodos } from './helpers/getFilteredTodos';

const initialFormState: FilterOptions = {
  todoStatus: TodoStatus.All,
  searchQuery: '',
};

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState<Todo []>([]);
  const [filterState, setFilterState] = useState<FilterOptions>(initialFormState);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const { searchQuery, todoStatus } = filterState;

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(responce => {
        setTodos(responce);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const updateFormState = (key: string, value: string | TodoStatus) => {
    setFilterState(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const closeModal = () => {
    setSelectedTodo(null);
  };

  const visibleTodos = getFilteredTodos(todos, {
    todoStatus, searchQuery,
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onChangeFormState={updateFormState}
                formState={filterState}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && todos.length && (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodo}
                  onSelectTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={closeModal}
        />
      )}
    </>
  );
};
