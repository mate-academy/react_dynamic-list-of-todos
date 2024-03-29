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
import { Status } from './enums/Status';

export const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true); // for hiding modal once the posts fully loaded
  const [value, setValue] = useState<string>(''); // for controling input, the reasone why it is in App component because I need to set this state into two components (TodoFilter and TodoList)
  const [status, setStatus] = useState(Status.All); // for control select
  const [todos, setTodos] = useState<Todo[]>([]); // for updating todos list
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null); // this needs for information into popup

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
  };

  const handleClearInput = () => {
    setValue('');
  };

  const handleShowModal = useMemo(
    () => (todo: Todo) => {
      setSelectedTodo(todo);
    },
    [],
  );

  const handleCheckStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as Status);
  };

  const handleFiltration = (query: string, condition: Status) => {
    let preparedTodos = [...todos];

    if (query) {
      preparedTodos = preparedTodos.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (condition) {
      switch (condition) {
        case Status.Active.toLowerCase():
          preparedTodos = preparedTodos.filter(todo => !todo.completed);
          break;
        case Status.Completed.toLowerCase():
          preparedTodos = preparedTodos.filter(todo => todo.completed);
          break;
      }
    }

    return preparedTodos;
  };

  useEffect(() => {
    getTodos().then(response => {
      setTodos(response);
      setLoading(!response);
    });
  }, []);
  const visibleTodos = handleFiltration(value, status);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                text={value}
                handleFilter={handleFilter}
                handleClearInput={handleClearInput}
                handleCheckStatus={handleCheckStatus}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  handleShowModal={handleShowModal}
                  choseTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          choseTodo={selectedTodo}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};
