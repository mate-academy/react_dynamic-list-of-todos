import React, { useState, useEffect, useRef } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

interface Props {
  selectedTodo: Todo | null;
  changeShowModal: (value: boolean) => void;
  onSelectedTodo: (value: Todo | null) => void;
}



export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  changeShowModal,
  onSelectedTodo,
}) => {
  const [user, setUser] = useState<User>();
  const loadedUser = useRef(false);

  useEffect(() => {
    if (selectedTodo) {
      getUser(selectedTodo.userId).then((data: User) => {
        loadedUser.current = true;
        setUser(data);
      });
    }
  }, [selectedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!loadedUser.current ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                loadedUser.current = false;
                changeShowModal(false);
                onSelectedTodo(null);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
