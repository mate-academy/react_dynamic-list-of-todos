/* eslint-disable max-len */
import React, { useCallback, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { useFetch } from './components/hooks/useFetch';
import { User } from './types/User';
import { FilterOption } from './types/FilterBy';

const filterTodos = (
  todoList: Todo[],
  query: string,
  filterBy: string,
): Todo[] => {
  let filteredTodos = [...todoList];

  if (query) {
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(query),
    );
  }

  if (filterBy !== FilterOption.ALL) {
    filteredTodos = filteredTodos.filter(todo => {
      switch (filterBy) {
        case FilterOption.ACTIVE: {
          return !todo.completed;
        }

        case FilterOption.COMPLETED: {
          return todo.completed;
        }

        default: {
          return true;
        }
      }
    });
  }

  return filteredTodos;
};

export const App: React.FC = () => {
  const { data: todos, loading, error } = useFetch<Todo[]>(getTodos, []);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState('');
  const sanitizedQuery = query.trim().toLowerCase();

  const visibleTodos = useMemo(
    () => filterTodos(todos, sanitizedQuery, filterBy),
    [sanitizedQuery, filterBy, todos],
  );

  const handleSelectTodo = (todoId: number | null) => {
    setSelectedTodoId(todoId);
  };

  const selectedTodo = todos.find(todo => todo.id === selectedTodoId);
  const fetchUser = useCallback(() => {
    return selectedTodo
      ? getUser(selectedTodo.userId)
      : Promise.resolve({} as User);
  }, [selectedTodo]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos: {filterBy}</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                setFilterBy={setFilterBy}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && todos.length > 0 && (
                <TodoList
                  todos={visibleTodos}
                  onTodoSelect={handleSelectTodo}
                  selectedTodoId={selectedTodoId}
                />
              )}
              {!loading && error && <p>{error}</p>}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={() => handleSelectTodo(null)}
          fetchUser={fetchUser}
        />
      )}
    </>
  );
};
