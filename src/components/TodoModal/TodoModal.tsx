import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todoModal: Todo | null;
  userModal: User | null;
  onCloseButtonClick: () => void;
};

export const TodoModal = ({
  userModal,
  todoModal,
  onCloseButtonClick,
}: Props) => {
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!userModal ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todoModal?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onCloseButtonClick}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todoModal?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={classNames({
                  'has-text-succes': todoModal?.completed,
                  'has-text-danger': !todoModal?.completed,
                })}
              >
                {`${todoModal?.completed ? 'Done' : 'Planned'}`}
              </strong>

              {' by '}

              <a href={`mailto:${userModal.email}`}>{userModal.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
