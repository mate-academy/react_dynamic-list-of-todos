/* eslint-disable max-len */
import React, { useEffect, useState, useMemo } from 'react';
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
  const [isLoadiang, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<null | Todo>(null);
  const [statusState, setStatusState] = useState(StatusState.All);
  const [titleQuery, setTitleQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredTodos = useMemo(() => {
    const lowerTitleQuery = titleQuery.toLowerCase();

    return todos
      .filter(todo => {
        switch (statusState) {
          case StatusState.Active:
            return !todo.completed;
          case StatusState.Competed:
            return todo.completed;
          default:
            return true;
        }
      })
      .filter(todo => (
        todo.title.toLowerCase().includes(lowerTitleQuery)
      ));
  }, [statusState, titleQuery, todos]);

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
              {isLoadiang
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
