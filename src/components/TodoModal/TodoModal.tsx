import React from 'react';
import { Loader } from '../Loader';
import { ErrorMessage } from '../ErrorMessage';
import { TodoWithUser } from '../../types/TodoWithUser';

type Props = {
  selectedTodoWithUser: TodoWithUser | null;
  isTodoWithUserLoading: boolean;
  hasTodoWithUserLoadingError: boolean;
  onTodoWithUserUnselect: () => void;
};

export const TodoModal: React.FC<Props> = ({
  selectedTodoWithUser,
  isTodoWithUserLoading,
  hasTodoWithUserLoadingError,
  onTodoWithUserUnselect,
}) => {
  const {
    id,
    title,
    completed,
    user,
  } = selectedTodoWithUser ?? {};

  const {
    name,
    email,
  } = user ?? {};

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isTodoWithUserLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onTodoWithUserUnselect}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <section className="block" data-cy="modal-user">
              <strong
                className={completed ? 'has-text-success' : 'has-text-danger'}
              >
                {completed ? 'Done' : 'Planned'}
              </strong>

              {hasTodoWithUserLoadingError
                ? (
                  <ErrorMessage
                    message={`Sorry, we couldn't retrieve user information
                    due to a server error`}
                  />
                ) : (
                  <>
                    {' by '}

                    <a href={`mailto:${email}`}>
                      {name}
                    </a>
                  </>
                )}
            </section>
          </div>
        </div>
      )}
    </div>
  );
};
