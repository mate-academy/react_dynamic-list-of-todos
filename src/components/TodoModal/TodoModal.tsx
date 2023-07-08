/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';

import { Loader } from '../Loader';

import { getTodos, getUser } from '../../api';

import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  selectedTodoId: number,
  setSelectedTodoId: (todoId: number) => void,
  setIsModalShowed: (param: boolean) => void,
};

export const TodoModal: React.FC<Props> = ({
  selectedTodoId,
  setSelectedTodoId,
  setIsModalShowed,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const selectedTodo = todos.find(todo => todo.id === selectedTodoId);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => setTodos(todosFromServer));
  }, []);

  useEffect(() => {
    if (selectedTodo) {
      getUser(selectedTodo.userId)
        .then(userFromServer => setUser(userFromServer));
    }
  }, [selectedTodo]);

  const close = () => {
    setIsModalShowed(false);
    setSelectedTodoId(0);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div
        className="modal-background"
        onClick={close}
      />

      {!user || !selectedTodo ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodoId}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={close}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo.completed ? (
                <strong
                  className="has-text-success"
                >
                  Done
                </strong>
              ) : (
                <strong
                  className="has-text-danger"
                >
                  Planned
                </strong>
              )}

              {' by '}

              <a href="mailto:Sincere@april.biz">
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
