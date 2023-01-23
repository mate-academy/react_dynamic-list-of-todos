import React, {
  useEffect, useState,
} from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';

type Props = {
  personalTodo: Todo,
  onCloseModal: () => void,
};

export const TodoModal: React.FC<Props> = ({
  personalTodo,
  onCloseModal,
}) => {
  const [userName, setUserName] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const getLoadedUser = async () => {
    setIsFetching(true);

    const loadedTodo = await getUser(personalTodo.userId);

    setUserName(loadedTodo.name);

    setIsFetching(false);
  };

  useEffect(() => {
    getLoadedUser();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isFetching || !userName ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${personalTodo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onCloseModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {personalTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {personalTodo.completed
                ? (
                  <strong className="has-text-success">
                    Done
                  </strong>
                )
                : (
                  <strong className="has-text-danger">
                    Planned
                  </strong>
                )}

              {' by '}

              <a href="mailto:Sincere@april.biz">
                {userName}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
