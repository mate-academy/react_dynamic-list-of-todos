/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';
import { getTodos } from './api';

const filterTodos = (
  todos: Todo[],
  filterType: FilterType,
  filterText: string,
) => {
  let filteredTodos = [...todos];

  switch (filterType) {
    case FilterType.Active:
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
      break;

    case FilterType.Completed:
      filteredTodos = filteredTodos.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  if (filterText) {
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLocaleLowerCase().includes(filterText.toLocaleLowerCase()),
    );
  }

  return filteredTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.All);
  const [filterText, setFilterText] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(data => {
        setTodos(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterText={filterText}
                setFilterText={setFilterText}
                setFilterType={setFilterType}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filterTodos(todos, filterType, filterText)}
                  setSelectedTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={setSelectedTodo} />
      )}
    </>
  );
};
