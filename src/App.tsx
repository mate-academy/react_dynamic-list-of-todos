import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo, TodoStatus, FilterOptions } from './types';
import { getTodos } from './api';
import { Loader } from './components/Loader';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { TodoItem } from './components/TodoItem';
import { TodoModal } from './components/TodoModal';

function getFilteredTodos(todos: Todo[], filterOptions: FilterOptions) {
  const { status, query } = filterOptions;
  let filteredTodos = [...todos];

  if (status !== TodoStatus.All) {
    filteredTodos = filteredTodos.filter(({ completed }) => {
      switch (status) {
        case TodoStatus.Active:
          return !completed;

        case TodoStatus.Completed:
          return completed;

        default:
          throw new Error('This will never happen.');
      }
    });
  }

  if (query) {
    filteredTodos = filteredTodos.filter(({ title }) => {
      return title.toLowerCase().includes(query.toLowerCase());
    });
  }

  return filteredTodos;
}

const initialFilterOptions: FilterOptions = {
  status: TodoStatus.All,
  query: '',
};

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterOptions, setFilterOptions] = useState(initialFilterOptions);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredTodos = useMemo(
    () => getFilteredTodos(todos, filterOptions),
    [todos, filterOptions],
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                options={filterOptions}
                onOptionsChange={setFilterOptions}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList>
                  {filteredTodos.map(todo => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      selectedTodo={selectedTodo}
                      onSelect={setSelectedTodo}
                    />
                  ))}
                </TodoList>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={setSelectedTodo}
        />
      )}
    </>
  );
};
