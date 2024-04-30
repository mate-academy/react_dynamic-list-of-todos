import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

function getPreparedTodos(
  filter: string,
  todosArray: Todo[],
  appliedQuery: string,
) {
  const prepearedTodos = [...todosArray].filter(todo =>
    todo.title.toLowerCase().includes(appliedQuery.toLowerCase()),
  );

  if (filter) {
    const result = prepearedTodos.filter(todo => {
      switch (filter) {
        case 'all':
          return todo;
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
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
  const [isLoading, setIsLoading] = useState(true);
  const [appliedQuery, setAppliedQuery] = useState('');
  const [filterField, setFilterField] = useState('all');
  const [isModalOpen, setIsModalIcon] = useState(false);
  const [userTodo, setUserTodo] = useState<Todo | null>(null);

  const visibleTodos = useMemo<Todo[]>(
    () => getPreparedTodos(filterField, todos, appliedQuery),
    [appliedQuery, filterField, todos],
  );

  useEffect(() => {
    getTodos()
      .then(setTodos)
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
                appliedQuery={appliedQuery}
                setAppliedQuery={setAppliedQuery}
                setFilterField={setFilterField}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={visibleTodos}
                setIsModalIcon={setIsModalIcon}
                setUserTodo={setUserTodo}
                userTodo={userTodo}
                isModalOpen={isModalOpen}
              />
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TodoModal userTodo={userTodo} setIsModalIcon={setIsModalIcon} />
      )}
    </>
  );
};
