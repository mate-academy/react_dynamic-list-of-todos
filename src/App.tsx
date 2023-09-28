/* eslint-disable max-len */
import React, { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { StatusState } from './types/StatusState';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<null | Todo>(null);
  const [statusState, setStatusState] = useState(StatusState.All);
  const [titleQuery, setTitleQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filterTodosByStatus = (todo: Todo) => {
    switch (statusState) {
      case StatusState.Active:
        return !todo.completed;
      case StatusState.Completed:
        return todo.completed;
      default:
        return true;
    }
  };

  const filterTodosByTitle = (todo: Todo) => {
    const lowerTitleQuery = titleQuery.toLowerCase();

    return todo.title.toLowerCase().includes(lowerTitleQuery);
  };

  const filteredTodos = useMemo(() => {
    return todos.filter(filterTodosByStatus).filter(filterTodosByTitle);
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
