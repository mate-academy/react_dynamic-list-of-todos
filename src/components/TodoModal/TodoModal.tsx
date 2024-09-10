import React from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  currentTodo: Todo;
  user: User | null;
  userId: number;
  canselSelectedTodo: () => void;
  cardLoading: boolean;
};

export const TodoModal: React.FC<Props> = ({
  currentTodo,
  cardLoading,
  user,
  canselSelectedTodo = () => {},
}) => {
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {cardLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${currentTodo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={canselSelectedTodo}
              type="button"
              className="delete"
              data-cy="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={classNames('has-text-success', {
                  'has-text-danger': currentTodo.completed === false,
                })}
              >
                {currentTodo.completed === true ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href="mailto:Sincere@april.biz">{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
