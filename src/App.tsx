/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

enum Filters {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [appliedFilter, setAppliedFilter] = useState(Filters.All);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [userId, setUserId] = useState(0);
  const [checkId, setCheckId] = useState(0);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then((todo) => {
        setTodos(todo);
        setFilteredTodos(todo);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                todos={todos}
                appliedFilter={appliedFilter}
                filteredTodos={filteredTodos}
                setFilteredTodos={setFilteredTodos}
                setAppliedFilter={setAppliedFilter}
              />
            </div>

            <div className="block">
              {loading && (
                <Loader />
              )}
              {!loading && todos.length > 0 && (
                <TodoList
                  checkId={checkId}
                  setCheckId={setCheckId}
                  setUserId={setUserId}
                  filteredTodos={filteredTodos}
                  isCheck={isCheck}
                  setIsCheck={setIsCheck}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        setCheckId={setCheckId}
        isCheck={isCheck}
        setIsCheck={setIsCheck}
        filteredTodos={filteredTodos}
        checkId={checkId}
        userId={userId}
        loading={loading}
        setLoading={setLoading}
      />
    </>
  );
};
