import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

interface Props {
  setButton: (trueOrFalse: boolean) => (void)
  todoObj: Todo,
}

export const TodoModal: React.FC<Props> = ({
  setButton,
  todoObj,
}) => {
  const [user, setUser]
  = useState<User>({
    id: 0,
    name: '',
    email: '',
    phone: '',
  });
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getTodo() {
      const fetchedData = await getUser(todoObj.userId);

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
                {todoObj.id}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => setButton(false)}
              />
            </header>

            <div className="modal-card-body">
              <p
                className={todoObj.completed
                  ? 'has-text-success block'
                  : 'has-text-danger block'}
                data-cy="modal-title"
              >
                {todoObj.title}
              </p>

              <p className="block" data-cy="modal-user">
                {todoObj.completed
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
