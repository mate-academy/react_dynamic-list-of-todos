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
import { TodosFilters } from './types/TodosFilters';
import { Filter } from './types/Filter';

function getFilteredTodos(todos: Todo[], filter: Filter): Todo[] {
  let filteredTodos = todos.filter(todo => {
    switch (filter.option) {
      case TodosFilters.Active:
        return !todo.completed;
      case TodosFilters.Completed:
        return todo.completed;
      case TodosFilters.All:
      default:
        return todo;
    }
  });

  if (filter.query) {
    filteredTodos = filteredTodos
      .filter(({ title }) => title.toLowerCase()
        .includes(filter.query.toLowerCase()));
  }

  return filteredTodos;
}

const initialState = {
  todos: [],
  loading: false,
  selectedTodo: null,
  filter: {
    option: TodosFilters.All,
    query: '',
  },
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialState.todos);
  const [loading, setLoading] = useState(initialState.loading);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(initialState.selectedTodo);
  const [filter, setFilter] = useState<Filter>(initialState.filter);

  const filteredTodos = getFilteredTodos(todos, filter);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleFilter = (currentFilter: Filter) => {
    setFilter(currentFilter);
  };

  const handleShowModal = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handlerCloseModal = () => {
    setSelectedTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter handleFilter={handleFilter} />
            </div>

            <div className="block">
              {loading
                ? <Loader />
                : (
                  <TodoList
                    todos={filteredTodos}
                    selectedTodo={selectedTodo}
                    handleShowModal={handleShowModal}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo
        ? (
          <TodoModal
            selectedTodo={selectedTodo}
            handlerCloseModal={handlerCloseModal}
          />
        )
        : null}
    </>
  );
};
