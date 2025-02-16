/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Filter } from './types/Filter';
import { getTodos } from './api';
import { Todo } from './types/Todo';

const getFilteredTodos = (
  todos: Todo[],
  filter: Filter,
  query: string,
): Todo[] => {
  const normalizedQuery = query.trim().toLowerCase();

  let filteredTodos = todos.filter(todo => {
    if (filter === Filter.Completed) {
      return todo.completed;
    }

    if (filter === Filter.Active) {
      return !todo.completed;
    }

    return true;
  });

  filteredTodos = filteredTodos.filter(todo => {
    const normalizedTodoTitle = todo.title.trim().toLowerCase();

    return normalizedTodoTitle.includes(normalizedQuery);
  });

  return filteredTodos;
};

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [selectedTodoId, setSelectedTodoId] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    getTodos().then(todos => {
      setTodosFromServer(todos);
      setIsLoading(false);
    });
  }, []);

  const handleOptionFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as Filter;

    setFilter(value);
  };

  const filteredTodos = getFilteredTodos(todosFromServer, filter, query);

  const selectedTodo = filteredTodos.find(todo => todo.id === selectedTodoId);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onOptionFilter={handleOptionFilter}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodoId}
                  setSelectedTodoId={setSelectedTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} setSelectedTodoId={setSelectedTodoId} />
      )}
    </>
  );
};
