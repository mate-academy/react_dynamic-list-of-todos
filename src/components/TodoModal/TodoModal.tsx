import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  show: Todo;
  setShow: React.Dispatch<React.SetStateAction<Todo | null>>;
};

export const TodoModal: React.FC<Props> = ({ show, setShow }) => {
  const [userInfo, setUserInfo] = useState<null | User>(null);

  const URL = `https://mate-academy.github.io/react_dynamic-list-of-todos/api/users/${show.userId}.json`;

  useEffect(() => {
    const fetchFunk = async () => {
      fetch(URL)
        .then(res => {
          if (!res.ok) {
            throw new Error(`${res.statusText}`);
          } else {
            return res.json();
          }
        })
        .then(res => {
          setUserInfo(res);
        })
        .catch((error) => {
          // eslint-disable-next-line no-alert
          alert(error.message);
        });
    };

    fetchFunk();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      { userInfo === null ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${show.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                setShow(null);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {show.title}
            </p>

            <p className="block" data-cy="modal-user">
              {
                show.completed
                  ? (
                    <strong className="has-text-success">Done</strong>
                  ) : (
                    <strong className="has-text-danger">Planned</strong>
                  )
              }
              {' by '}

              <a href={userInfo.email}>
                {userInfo.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
