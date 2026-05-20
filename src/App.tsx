/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { CompletedFilter, TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { getTodos } from './services/todo';

const getFilteredTodos = (
  todos: Todo[],
  { search, completed }: { search: string; completed: CompletedFilter },
) => {
  let filteredTodos = todos;

  const preparedSearch = search.trim().toLowerCase();

  //Filter by search
  if (preparedSearch !== '') {
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(preparedSearch),
    );
  }

  // Filter by completed
  if (completed !== CompletedFilter.All) {
    filteredTodos = filteredTodos.filter(todo => {
      switch (completed) {
        case CompletedFilter.Active:
          return todo.completed === false;

        case CompletedFilter.Completed:
          return todo.completed === true;

        default:
          throw new Error('Missing case in getFilteredTodos completed filter');
      }
    });
  }

  return filteredTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [completedFilter, setCompletedFilter] = useState(CompletedFilter.All);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  // getTodos()
  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setIsLoading(false);
      })
      .catch(error => alert(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredTodos = getFilteredTodos(todos, {
    search,
    completed: completedFilter,
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                search={search}
                completed={completedFilter}
                onSearchChange={setSearch}
                onCompletedChange={setCompletedFilter}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  onSelectTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo !== null && (
        <TodoModal todo={selectedTodo} onClose={() => setSelectedTodo(null)} />
      )}
    </>
  );
};
