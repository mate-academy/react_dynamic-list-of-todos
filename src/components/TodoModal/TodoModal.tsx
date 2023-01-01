import { FC } from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

interface Props {
  recentTodo: Todo;
  user: User | null;
  handleCloseModal: () => void;
}
export const TodoModal: FC<Props> = ({
  recentTodo,
  user,
  handleCloseModal,
}) => {
  const {
    id,
    title,
    completed,
  } = recentTodo || {};

  const { email, name } = user || {};

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {
        user
          ? (
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
                  onClick={handleCloseModal}
                />
              </header>

              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">
                  {title}
                </p>

                <p className="block" data-cy="modal-user">
                  {
                    completed
                      ? <strong className="has-text-success">Done</strong>
                      : <strong className="has-text-danger">Planned</strong>
                  }
                  {' by '}

                  <a href={`mailto:${email}`}>{name}</a>
                </p>
              </div>
            </div>
          )
          : <Loader />
      }
    </div>
  );
};
