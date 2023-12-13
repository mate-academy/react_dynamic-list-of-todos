import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  onClose: () => void;
}

export const TodoModal: React.FC<Props> = ({ todo, onClose }) => {
  const [user, setUser] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [emailLink, setEmailLink] = useState<string>('');

  const fetchUser = async () => {
    setLoading(true);
    try {
      const userData = await getUser(todo.userId);

      setUser([userData]);
      setEmailLink(`mailto:${userData.email}`);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      throw new Error(String(err));
    }
  };

  useEffect(() => {
    fetchUser();
  }, [todo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading ? (
        <Loader />
      ) : (
        user.map((item) => (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${todo.id}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={onClose}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todo.title}
              </p>

              <p className="block" data-cy="modal-user">
                {todo.completed ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )}

                {' by '}

                <a href={emailLink}>{item.name}</a>
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
