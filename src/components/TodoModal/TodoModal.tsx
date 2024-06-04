import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getTodos, getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  modalTodoId: number;
  setModalTodoId: (id: number) => void;
};
export const TodoModal: React.FC<Props> = ({ modalTodoId, setModalTodoId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [choosedTodo, setChoosedTodo] = useState<Todo | null>(null);
  const [choosedTodoUser, setChoosedTodoUser] = useState<User | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then((data: Todo[]) => {
        const choosed = data.find(item => item.id === modalTodoId);

        if (choosed) {
          setChoosedTodo(choosed);
          getUser(choosed.userId).then(user => setChoosedTodoUser(user));
        }
      })
      .finally(() => setIsLoading(false));
  }, [modalTodoId]);

  const { email, name } = choosedTodoUser || {};
  const { id, title, completed } = choosedTodo || {};

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setModalTodoId(0)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}

              <a href={`mailto:${email}`}>{name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
