/* eslint-disable max-len */
import React, { useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

function getPrepareTodos(filter: string, todos1: Todo[], appliedQuery: string) {
  const prepearedTodos = [...todos1].filter(todo =>
    todo.title.toLowerCase().includes(appliedQuery.toLowerCase()),
  );

  if (filter) {
    const result = prepearedTodos.filter(todo => {
      switch (filter) {
        case 'all':
          return todo;
        case 'active':
          return todo.completed !== true;
        case 'completed':
          return todo.completed === true;
        default:
          return todo;
      }
    });

    return result;
  } else {
    return prepearedTodos;
  }
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [appliedQuery, setAppliedQuery] = useState('');
  const [filterField, setFilterField] = useState('all');
  const [modalIcon, setModalIcon] = useState(false);
  const [userTodo, setUserTodo] = useState<Todo | null>(null);

  const visibleTodos = useMemo<Todo[]>(
    () => getPrepareTodos(filterField, todos, appliedQuery),
    [appliedQuery, filterField, todos],
  );

  getTodos()
    .then(setTodos)
    .finally(() => setLoading(false));

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                appliedQuery={appliedQuery}
                setAppliedQuery={setAppliedQuery}
                setFilterField={setFilterField}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={visibleTodos}
                setModalIcon={setModalIcon}
                setUserTodo={setUserTodo}
                userTodo={userTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {modalIcon && (
        <TodoModal userTodo={userTodo} setModalIcon={setModalIcon} />
      )}
    </>
  );
};
