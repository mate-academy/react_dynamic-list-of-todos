/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';

const getFilteredTodos = (
  todos: Todo[],
  query: string,
  filter: FilterType,
) => {
  return todos.filter(todo => {
    const filteredByTitle = todo.title.toLowerCase().includes(query.toLowerCase());

    switch (filter) {
      case FilterType.ACTIVE:
        return !todo.completed && filteredByTitle;

      case FilterType.COMPLETED:
        return todo.completed && filteredByTitle;

      default:
        return filteredByTitle;
    }
  });
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState(FilterType.ALL);

  useEffect(() => {
    const getTodosFromServer = async () => {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
      setIsLoaded(true);
    };

    getTodosFromServer();
  }, []);

  const clearSelectedTodo = (todo: Todo | null) => {
    setSelectedTodo(todo);
  };

  const visibleTodos = getFilteredTodos(todos, query, filter);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onChangeQuery={setQuery}
                filter={filter}
                onSelectFilter={setFilter}
              />
            </div>

            {isLoaded
              ? (
                <div className="block">
                  <TodoList
                    todos={visibleTodos}
                    selectedTodo={selectedTodo}
                    onSelect={setSelectedTodo}
                  />
                </div>
              )
              : <Loader />}
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={() => clearSelectedTodo(null)}
        />
      )}
    </>
  );
};
