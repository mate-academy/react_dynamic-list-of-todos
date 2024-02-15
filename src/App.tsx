/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { FilterType } from './types/Filter';
import { FilterParams } from './types/FilterParams';
import { getFilteredTodos } from './services/getFilteredTodos';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterParams, setFilterParams] = useState<FilterParams>({
    query: '',
    status: FilterType.ALL,
  });

  const filteredTodos = getFilteredTodos(todos, filterParams);

  useEffect(() => {
    setLoading(true);
    getTodos().then((todosList) => {
      setTodos(todosList);
      setLoading(false);
    });
  }, []);

  const handleShowModal = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleCloseModal = () => {
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
                filterParams={filterParams}
                setFilterParams={setFilterParams}
              />
            </div>

            <div className="block">
              {loading ? <Loader /> : (
                <TodoList
                  todos={filteredTodos}
                  onShowModal={handleShowModal}
                  selectedTodoId={selectedTodo?.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo
    && (
      <TodoModal
        todo={selectedTodo}
        onCloseModal={handleCloseModal}
      />
    )}
    </>
  );
};
