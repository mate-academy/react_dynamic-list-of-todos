import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';
import { getUser } from '../../api';

type Props = {
  selectedTodo: Todo,
  selectTodo: (id: number) => void,
};

export const TodoModal: React.FC<Props> = ({ selectedTodo, selectTodo }) => {
  const {
    id,
    title,
    completed,
    userId,
  } = selectedTodo;
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const selectedUser = await getUser(userId);

        setUser(selectedUser);
      } catch (error) {
        throw new Error('Error while selecting user');
      }
    };

    fetchUser();
  }, [userId]);

  const closeModal = () => {
    selectTodo(0);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (
        <Loader />
      ) : (
        <div className="modal-card" key={user.id}>
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={
                  classNames({
                    'has-text-success': completed,
                    'has-text-danger': !completed,
                  })
                }
              >
                {
                  completed
                    ? 'Done'
                    : 'Planned'
                }
              </strong>

              {' by '}

              <a href={`mailto:${user.email}`}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
