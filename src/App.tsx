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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const loadTodos = async () => {
      setIsLoading(true);
      getTodos()
        .then(setTodos)
        .finally(() => setIsLoading(false));
    };

    loadTodos();
  }, []);

  const filterTodosByActiveFilter = (filter: string) => {
    switch (filter) {
      case 'Completed':
        return todos.filter(todo => todo.completed);
      case 'Active':
        return todos.filter(todo => !todo.completed);
      case 'All':
      default:
        return todos;
    }
  };

  const filterTodosByQuery = (todoList: Todo[]) => {
    return todoList.filter(todo => todo.title.toUpperCase().includes(query.toUpperCase()));
  };

  const filteredTodosByActiveFilter = filterTodosByActiveFilter(activeFilter);
  const visibleTodos = filterTodosByQuery(filteredTodosByActiveFilter);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onQueryChange={setQuery}
                onFilterChange={setActiveFilter}
                query={query}
                filter={activeFilter}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={visibleTodos}
                onSelectingTodo={setSelectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal selectedTodo={selectedTodo} onModalClose={setSelectedTodo} />}
    </>
  );
};
