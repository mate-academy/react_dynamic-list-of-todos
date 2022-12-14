/* eslint-disable max-len */
import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [userId, setUserId] = useState(0);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [queryToFilter, setQueryToFilter] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(Filter.ALL);

  let visibleTodos = todos;

  switch (selectedStatus) {
    case Filter.COMPLETED:
      visibleTodos = visibleTodos.filter(todo => todo.completed === true);
      break;

    case Filter.ACTIVE:
      visibleTodos = todos.filter(todo => todo.completed === false);
      break;

    default: visibleTodos = todos;
  }

  visibleTodos = visibleTodos.filter(todo => todo.title.toLocaleLowerCase()
    .includes(queryToFilter.toLocaleLowerCase()));

  useEffect(() => {
    getTodos()
      .then(setTodos);
  }, []);

  const closeTodoModal = () => {
    setUserId(0);
    setSelectedTodo(null);
  };

  const onSetQuery = useCallback((query) => {
    setQueryToFilter(query);
  }, []);

  const onSetSelectedStatus = useCallback((option) => {
    setSelectedStatus(option);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                getQuery={onSetQuery}
                getOption={onSetSelectedStatus}
                queryToFilter={queryToFilter}
                selectedStatus={selectedStatus}
              />
            </div>

            <div className="block">
              {visibleTodos.length > 0 && todos.length > 0
                && (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodo={selectedTodo}
                    setCurrentUserId={(newUserId) => setUserId(newUserId)}
                    setCurrentTodo={(todo) => setSelectedTodo(todo)}
                  />
                )}

              {todos.length > 0
                ? (
                  <table className="table is-narrow is-fullwidth">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>
                          <span className="icon">
                            <i className="fas fa-check" />
                          </span>
                        </th>
                        <th>Title</th>
                        <th> </th>
                      </tr>
                    </thead>
                  </table>
                )
                : (
                  <Loader />
                )}
            </div>
          </div>
        </div>
      </div>

      {userId !== 0
        && (
          <TodoModal
            userId={userId}
            selectedTodo={selectedTodo}
            closeTodoModal={closeTodoModal}
          />
        )}
    </>
  );
};
