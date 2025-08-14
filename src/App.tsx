/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import * as api from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

const filterByStatus = (todos: Todo[], status: string) => {
  switch (status) {
    case 'active':
      return todos.filter(todo => !todo.completed);
    case 'completed':
      return todos.filter(todo => todo.completed);
    default: // 'all'
      return todos;
  }
};

const filterByQuery = (todos: Todo[], query: string) => {
  return todos.filter(todo =>
    todo.title.toLowerCase().includes(query.toLowerCase()),
  );
};

export type InfoForModal = {
  todo: Todo;
  userId: number;
} | null;

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterQuery, setFilterQuery] = useState('');
  const [todoStatusToShow, setTodoStatusToShow] = useState('all');
  const [isDetailsShown, setIsDetailsShown] = useState(false);
  const [infoForModal, setInfoForModal] = useState<InfoForModal>(null);

  const todosFilteredByStatus = filterByStatus(todos, todoStatusToShow);
  const preparedTodos = filterByQuery(todosFilteredByStatus, filterQuery);

  useEffect(() => {
    setIsLoading(true);

    api
      .getTodos()
      .then(data => {
        setTodos(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterQuery={filterQuery}
                setFilterQuery={setFilterQuery}
                todoStatusToShow={todoStatusToShow}
                setTodoStatusToShow={setTodoStatusToShow}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={preparedTodos}
                setIsDetailsShown={setIsDetailsShown}
                setInfoForModal={setInfoForModal}
                infoForModal={infoForModal}
              />
            </div>
          </div>
        </div>
      </div>

      {isDetailsShown && (
        <TodoModal
          setIsDetailsShown={setIsDetailsShown}
          setInfoForModal={setInfoForModal}
          infoForModal={infoForModal}
        />
      )}
    </>
  );
};
