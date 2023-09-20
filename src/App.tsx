/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { StatusState } from './types/StatusState';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<null | Todo>(null);
  const [statusState, setStatusState] = useState(StatusState.All);
  const [titleQuery, setTitleQuery] = useState('');

  const loadTodo = () => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .catch(error => {
        // eslint-disable-next-line no-console
        console.warn(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(loadTodo, []);

  const filteredTodos = useMemo(() => {
    const lowerTitleQuery = titleQuery.toLowerCase();

    return todos
      .filter(todo => {
        switch (statusState) {
          case StatusState.Active:
            return !todo.completed;
          case StatusState.Completed:
            return todo.completed;
          case StatusState.All:
          default:
            return true;
        }
      })
      .filter(todo => (
        todo.title.toLowerCase().includes(lowerTitleQuery)
      ));
  }, [statusState, titleQuery, todos]);

  // isLoading -> Loader
  // !isLoading && todos.length === 0 -> empty array placeholder
  // !isLoading && todos.length !== 0 -> todoList

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
                titleQuery={titleQuery}
                setTitleQuery={setTitleQuery}
              />
            </div>

            <div className="block">
              {isLoading
                ? (
                  <Loader />
                )
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
