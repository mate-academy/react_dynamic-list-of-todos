/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { getTodos } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export enum Status {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  const [status, setStatus] = useState(Status.All);
  const [input, setInput] = useState('');

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter(currentTodo => {
      const matchesInput = currentTodo.title
        .toLowerCase()
        .includes(input.toLowerCase());

      const matchesStatus =
        (status === Status.Completed && currentTodo.completed) ||
        (status === Status.Active && !currentTodo.completed) ||
        status === Status.All;

      return input ? matchesInput && matchesStatus : matchesStatus;
    });
  }, [todos, status, input]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                input={input}
                onChangeStatus={setStatus}
                onChangeInput={setInput}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && todos.length > 0 && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodoId}
                  onChangeTodoId={setSelectedTodoId}
                  onShowModal={setShowModal}
                  onGetTodo={setTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <TodoModal
          onChangeShowModal={setShowModal}
          todo={todo}
          onChangeTodoId={setSelectedTodoId}
        />
      )}
    </>
  );
};
