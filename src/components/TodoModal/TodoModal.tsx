import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

interface Props {
  showModal: (arg: boolean) => void;
  selectedTodo: Todo | null;
  selectTodo: (arg: Todo | null) => void;
}

export const TodoModal: React.FC<Props> = (props) => {
  const { showModal, selectedTodo, selectTodo } = props;

  const [user, setUser] = useState<User>();
  const [modalAreLoaded, setModalAreLoaded] = useState(false);

  useEffect(() => {
    if (selectedTodo) {
      getUser(selectedTodo.userId)
        .then(setUser)
        .finally(() => (setModalAreLoaded(true)
        ));
    }
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!modalAreLoaded ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {selectedTodo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                showModal(false);
                selectTodo(null);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              { selectedTodo?.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}

              <a href={user?.email}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
