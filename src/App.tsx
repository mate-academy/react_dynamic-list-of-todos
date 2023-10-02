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
import { TodoStatus } from './types/FilterTodos';

type FilterObject = {
  query: string;
  filterParameter?: TodoStatus | string;
};

const getFilteredTodos = (todos: Todo[], { query, filterParameter }: FilterObject) => {
  let todosCopy = [...todos];

  if (query) {
    todosCopy = todosCopy.filter(todo => {
      return todo.title.toLowerCase().includes(query.trim().toLowerCase());
    });
  }

  if (filterParameter !== TodoStatus.All) {
    todosCopy = todosCopy.filter(todo => {
      switch (filterParameter) {
        case TodoStatus.Active:
          return !todo.completed;

        case TodoStatus.Completed:
          return todo.completed;

        default:
          return todo;
      }
    });
  }

  return todosCopy;
};

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterParameter, setFilterParameter] = useState<TodoStatus | string>(TodoStatus.All);
  const [query, setQuery] = useState<string>('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const preparedTodos = getFilteredTodos(todos, { query, filterParameter });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                filterParameter={filterParameter}
                onInputChange={setQuery}
                onSelectChange={setFilterParameter}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={preparedTodos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
