/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { StatusState } from './types/StatusState';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusState, setStatusState] = useState(StatusState.All);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredTodos = useMemo(() => {
    const lowerTitleQuery = query.toLowerCase();

    return todos.filter(todo => {
      switch (statusState) {
        case StatusState.Active:
          return !todo.completed;
        case StatusState.Completed:
          return todo.completed;
        default:
          return true;
      }
    }).filter(todo => (
      todo.title.toLowerCase().includes(lowerTitleQuery)
    ));
  }, [statusState, query, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                statusState={statusState}
                setStatusState={setStatusState}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={filteredTodos}
                    selectedTodoId={selectedTodo?.id}
                    onTodoSelected={setSelectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onTodoSelected={setSelectedTodo}
        />
      )}
    </>
  );
};
