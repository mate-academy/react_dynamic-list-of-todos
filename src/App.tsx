/* eslint-disable max-len */
import React, { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { request } from './api/request';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const { All, Active, Completed } = Filter;
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>(All);
  const [query, setQuery] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  const todosPoint = useMemo(() => 'todos', []);

  useEffect(() => {
    request(todosPoint)
      .then(data => {
        setTodos(data);
      })
      .catch(() => setError(true))
      .finally(() => setIsLoaded(true));
  }, []);

  const filterTodos = useMemo(() => todos.filter((todo) => {
    switch (selectedFilter) {
      case Completed:
        return todo.completed;
      case Active:
        return !todo.completed;
      default:
        return todo;
    }
  }), [selectedFilter, todos]);

  const filterTodosByQuery = useMemo(() => filterTodos.filter((todo) => todo.title.includes(query.toLowerCase())), [query, filterTodos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={(phrase) => setQuery(phrase)}
                setSelectedFilter={(filter: string) => setSelectedFilter(filter)}
              />
            </div>

            <div className="block">
              {isLoaded ? (
                (todos.length !== 0 && !error && (
                  <TodoList
                    todos={filterTodosByQuery}
                    setSelectedTodo={(todo: Todo) => setSelectedTodo(todo)}
                    selectedTodo={selectedTodo}
                  />
                )) || (
                  <h2 className="has-text-danger bold">
                    Something went wrong or to-dos list is empty!
                  </h2>
                )
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={(todo: null) => setSelectedTodo(todo)}
        />
      )}
    </>
  );
};
