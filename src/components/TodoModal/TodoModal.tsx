import React from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  isLoading: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectTodo: Todo[];
  selectUser: User[];
};

export const TodoModal: React.FC<Props> = ({
  isLoading,
  setIsModalOpen,
  selectTodo,
  selectUser,
}) => {
  return (
    selectUser.length > 0 && (
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />
        {isLoading ? (
          <Loader />
        ) : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${selectTodo[0].id}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => {
                  setIsModalOpen(false);
                }}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {selectTodo[0].title}
              </p>

              <p className="block" data-cy="modal-user">
                {/*  */}
                {selectTodo[0].completed ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )}

                {' by '}

                <a href="mailto:Sincere@april.biz">{selectUser[0].name}</a>
              </p>
            </div>
          </div>
        )}
      </div>
    )
  );
};
