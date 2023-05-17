import React, { useEffect, useState, useCallback } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

interface TodoModalProps {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
  activeTodo: Todo | null,
  setActiveTodo: React.Dispatch<React.SetStateAction<Todo | null>>
}

export const TodoModal: React.FC<TodoModalProps> = (props: TodoModalProps) => {
  const { setIsOpenModal, activeTodo, setActiveTodo } = props;
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const closeModal = useCallback(() => {
    setIsOpenModal(false);
    setActiveTodo(null);
  }, []);

  useEffect(() => {
    if (!activeTodo) {
      return;
    }

    getUser(activeTodo.userId)
      .then((data) => {
        setUser(data);
        setIsLoading(false);
      })
    // eslint-disable-next-line no-console
      .catch(e => console.log(e));
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          {activeTodo && (
            <>
              <header className="modal-card-head">
                <div
                  className="modal-card-title has-text-weight-medium"
                  data-cy="modal-header"
                >
                  {`Todo #${activeTodo.id}`}
                </div>

                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                  type="button"
                  className="delete"
                  data-cy="modal-close"
                  onClick={() => closeModal()}
                />
              </header>

              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">
                  {activeTodo.title}
                </p>

                <p className="block" data-cy="modal-user">
                  {activeTodo.completed
                    ? <strong className="has-text-success">Done</strong>
                    : <strong className="has-text-danger">Planned</strong>}

                  {' by '}

                  <a href={`mailto:${user?.email}`}>
                    {user?.name}
                  </a>
                </p>
              </div>
            </>
          )}

        </div>
      )}
    </div>
  );
};
