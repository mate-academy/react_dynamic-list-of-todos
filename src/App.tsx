/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { FilterSelect } from './types/FilterSelect';

export const App: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');

  const [selectedTodo, setSelectedTodo] = React.useState<Todo | null>(null);

  const [filterSelect, setFilterSelect] = React.useState<FilterSelect>(FilterSelect.All);
  const [filterTitle, setFilterTitle] = React.useState<string>('');

  const filterTodos = (
    todosToFilter: Todo[],
    filterToApply: [FilterSelect, string],
  ) => {
    let newTodos = [...todosToFilter];

    newTodos = newTodos.filter((todo) => {
      switch (filterToApply[0]) {
        case FilterSelect.Active:
          return !todo.completed;

        case FilterSelect.Completed:
          return todo.completed;

        default:
          return true;
      }
    });

    newTodos = newTodos.filter((todo) => todo.title.trim().toLowerCase()
      .includes(filterToApply[1].trim().toLocaleLowerCase()));

    return newTodos;
  };

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then((data) => {
        setError('');
        setTodos(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredTodos = filterTodos(todos, [filterSelect, filterTitle]);

  const showTodos = !isLoading && error === '' && todos.length > 0;
  const showEmpty = !isLoading && error === '' && todos.length === 0;
  const showError = !isLoading && error !== '';
  const showModal = selectedTodo !== null;

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterSelect={filterSelect}
                filterTitle={filterTitle}
                onFilterSelectChange={(newFilterSelect: FilterSelect) => setFilterSelect(newFilterSelect)}
                onFilterTitleChange={(newFilterTitle: string) => setFilterTitle(newFilterTitle)}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}

              {showTodos && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  toSelectTodo={(todo) => setSelectedTodo(todo)}
                />
              )}

              {showEmpty && (
                <p className="has-text-centered">No todos found.</p>
              )}

              {showError && (
                <p className="has-text-centered has-text-danger">
                  {error}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <TodoModal
          todo={selectedTodo}
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
