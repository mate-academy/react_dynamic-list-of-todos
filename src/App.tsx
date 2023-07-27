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
import { FilterStatus } from './components/enum/enum';

interface FilterProps {
  query?: string,
  filterStatus?: FilterStatus,
}

function filterTodosByStatus(todos: Todo[], status: FilterStatus) {
  let todosCopy = [...todos];

  switch (status) {
    case (FilterStatus.ACTIVE): {
      todosCopy = todosCopy.filter(todo => !todo.completed);
      break;
    }

    case (FilterStatus.COMPLETED): {
      todosCopy = todosCopy.filter(todo => todo.completed);
      break;
    }

    default: {
      break;
    }
  }

  return todosCopy;
}

function filterTodos(
  todos: Todo[],
  { query, filterStatus }: FilterProps,
): Todo[] {
  let todosCopy = [...todos];

  if (filterStatus) {
    todosCopy = filterTodosByStatus(todosCopy, filterStatus);
  }

  if (query) {
    const normalizedQuery = query.toLowerCase();

    todosCopy = todosCopy.filter((todo: Todo) => {
      const normalizedTitle = todo.title.toLowerCase();

      return normalizedTitle.includes(normalizedQuery);
    });
  }

  return todosCopy;
}

export const App: React.FC = () => {
  const [baseTodos, setBaseTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState(FilterStatus.ALL);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const todos = filterTodos(baseTodos, { query, filterStatus });

  useEffect(() => {
    getTodos().then(todo => {
      setBaseTodos(todo);
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
                query={query}
                setQuery={setQuery}
                setFilterStatus={setFilterStatus}
              />
            </div>

            <div className="block">
              {baseTodos.length === 0
                ? <Loader />
                : (
                  <TodoList
                    todos={todos}
                    selectedTodoId={selectedTodo?.id}
                    setSelectedTodo={setSelectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo
        && (
          <TodoModal
            selectedTodo={selectedTodo}
            setSelectedTodo={setSelectedTodo}
          />
        )}
    </>
  );
};
