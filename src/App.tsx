/* eslint-disable max-len */
import React, { useState, useEffect, useCallback } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { SelectedName } from './types/SelectedName';

const filterTodos = (todos: Todo[], query: string, filterBy: SelectedName) => {
  let prepareTodos = [...todos];

  if (query) {
    prepareTodos = prepareTodos.filter(item => item.title.toLowerCase()
      .includes(query.trim().toLowerCase()));
  }

  switch (filterBy) {
    case SelectedName.Active:
      prepareTodos = prepareTodos.filter(item => !item.completed);
      break;

    case SelectedName.Completed:
      prepareTodos = prepareTodos.filter(item => item.completed);
      break;

    case SelectedName.All:
    default:
      break;
  }

  return prepareTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedId, setSelectedId] = useState<Todo | null>(null);
  const [filterBy, setFilterBy] = useState<SelectedName>(SelectedName.All);
  const [query, setQuery] = useState('');

  const visibleTodos = filterTodos(todos, query, filterBy);

  const handleTodos = async () => {
    const todo = await getTodos();

    setTodos(todo);
  };

  useEffect(() => {
    handleTodos();
  }, []);

  const showTodoUser = useCallback((todo: Todo) => {
    setSelectedId(todo);
  }, [selectedId]);

  const closeTodoUser = useCallback(() => {
    setSelectedId(null);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterBy={filterBy}
                setFilterBy={setFilterBy}
                setQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {
                visibleTodos.length > 0
                  ? (
                    <TodoList
                      todo={visibleTodos}
                      showTodos={showTodoUser}
                      selectedId={selectedId}
                    />
                  )
                  : <Loader />
              }
            </div>
          </div>
        </div>
      </div>

      {selectedId && (
        <TodoModal selectedId={selectedId} closeTodosUser={closeTodoUser} />
      )}
    </>
  );
};
