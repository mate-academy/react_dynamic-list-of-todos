/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { ShowType } from './types/ShowType';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [todosShowMode, setTodosShowMode] = useState<ShowType>(ShowType.all);
  const [todosFilterByTitle, setTodosFilterByTitle] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [todoError, setTodoError] = useState('');

  useEffect(() => {
    getTodos()
      .then(setTodosFromServer)
      .catch((error) => setTodoError(error.message))
      .finally(() => setIsLoading(false));
  }, []);

  const getFilteredTodos = (newFilter: string, newShow: ShowType) => {
    let todoCopy: Todo[] = [...todosFromServer];

    if (newShow === ShowType.active) {
      todoCopy = todosFromServer.filter((todo) => !todo.completed);
    }

    if (newShow === ShowType.completed) {
      todoCopy = todosFromServer.filter((todo) => todo.completed);
    }

    if (newFilter) {
      const lowerCaseFilter = newFilter.trim().toLowerCase();

      return todoCopy.filter((todo) => todo.title.toLowerCase().includes(lowerCaseFilter));
    }

    return todoCopy;
  };

  const todos = getFilteredTodos(todosFilterByTitle, todosShowMode);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                show={todosShowMode}
                filter={todosFilterByTitle}
                onChangeShow={setTodosShowMode}
                onChangeFilter={setTodosFilterByTitle}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {(!isLoading && todoError) && (
                <p>
                  {' '}
                  {todoError}
                  {' '}
                </p>
              )}
              <TodoList
                todos={todos}
                selectedTodo={selectedTodo}
                onSelectedTodo={setSelectedTodo}
                changeShowModal={setIsShowModal}
              />
            </div>
          </div>
        </div>
      </div>
      {isShowModal && selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onSelectedTodo={setSelectedTodo}
          changeShowModal={setIsShowModal}
        />
      )}
    </>
  );
};
