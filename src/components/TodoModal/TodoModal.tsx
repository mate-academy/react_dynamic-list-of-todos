import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  show: boolean;
  onClose: (value: boolean) => void;
  user: Todo;
};

export const TodoModal: React.FC<Props> = ({ show, onClose, user }) => {
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(show);
  const [person, setPerson] = useState<User | null>(null);

  useEffect(() => {
    setIsVisible(show);
  }, [show]);

  useEffect(() => {
    if (user) {
      getUser(user.userId).then(setPerson);
    }
  }, [user]);

  useEffect(() => {
    if (show) {
      setLoading(true);
      setTimeout(() => setLoading(false), 300);
    }
  }, [show]);

  return isVisible ? (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #{user.id}
              </div>

              <button
                onClick={() => onClose(false)}
                type="button"
                className="delete"
                data-cy="modal-close"
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {user.title}
              </p>

              <p className="block" data-cy="modal-user">
                {user.completed ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )}
                {' by '}
                <a href={person?.email}>{person?.name}</a>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  ) : null;
};
