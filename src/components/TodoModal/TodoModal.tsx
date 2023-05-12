import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';

interface Props {
  setButton: (trueOrFalse: boolean) => (void)
  setListButton: (trueOrFalse: boolean) => (void)
  title: string | undefined,
  completed: boolean | undefined,
  userId: number | undefined,
  id: number | undefined,
}

export const TodoModal: React.FC<Props> = ({
  setButton,
  title,
  setListButton,
  completed,
  userId,
  id,
}) => {
  const [user, setUser]
  = useState<User>({
    id: 0,
    name: '',
    email: '',
    phone: '',
  });
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function getTodo() {
      const fetchedData = await getUser(userId);

      setUser(fetchedData);
      setLoading(false);
    }

    getTodo();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {isLoading
        ? (<Loader />)
        : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #
                {id}
              </div>
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                aria-label="Username"
                onClick={() => {
                  setButton(false);
                  setListButton(false);
                }}
              />
            </header>

            <div className="modal-card-body">
              <p
                className={completed
                  ? 'has-text-success block'
                  : 'has-text-danger block'}
                data-cy="modal-title"
              >
                {title}
              </p>

              <p className="block" data-cy="modal-user">
                {completed
                  ? <strong className="has-text-success">Done</strong>
                  : <strong className="has-text-danger">Planned</strong>}

                {' by '}

                <a href={user.email}>
                  {user.name}
                </a>
              </p>
            </div>
          </div>
        )}

    </div>
  );
};
