import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  todo: Todo,
  setSelectedTodo: (todo: Todo | null) => void,
};

export const TodoModal: React.FC<Props> = (props) => {
  const {
    todo,
    setSelectedTodo,
  } = props;

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMesage, setErrorMesage] = useState('');

  useEffect(() => {
    setErrorMesage('');
    setIsLoading(true);

    if (todo) {
      getUser(todo?.userId)
        .then(userFromServer => {
          setUser(userFromServer);
          setIsLoading(false);
        })
        .catch(error => {
          setErrorMesage(error.message);
        })
        .finally(() => setIsLoading(false));
    } else {
      setErrorMesage('No selected todo');
    }
  }, [todo, setIsLoading]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && !user
        && <Loader />}

      {!isLoading && !errorMesage
        && (
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
                onClick={() => setSelectedTodo(null)}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todo.title}
              </p>

              <p className="block" data-cy="modal-user">
                <strong
                  className={`has-text-${todo.completed
                    ? 'success'
                    : 'danger'}`}
                >
                  {todo.completed
                    ? 'Done'
                    : 'Planned'}
                </strong>

                {' by '}

                {!isLoading && user
                  && (
                    <a href={`mailto: ${user.email}`}>
                      {user.name}
                    </a>
                  )}
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
