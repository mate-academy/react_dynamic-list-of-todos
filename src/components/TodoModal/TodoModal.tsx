import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Loader } from '../Loader';

type Props = {
  selectedTodo: Todo | null;
  setSelectedTodo: Dispatch<SetStateAction<Todo | null>>;
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  setSelectedTodo,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingModal, setIsLoadingModal] = useState(false);

  useEffect(() => {
    if (selectedTodo) {
      setIsLoadingModal(true);
      getUser(selectedTodo.userId).then(userData => {
        setUser(userData);
        setIsLoadingModal(false);
      });
    }
  }, [selectedTodo]);

  function handleCloseTodo() {
    setSelectedTodo(null);
  }

  return (
    <>
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />
        {isLoadingModal ? (
          <Loader />
        ) : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #{selectedTodo?.id}
              </div>

              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                aria-label="Close modal window"
                onClick={() => handleCloseTodo()}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {selectedTodo?.title}
              </p>

              <p className="block" data-cy="modal-user">
                <strong
                  className={cn({
                    'has-text-success': selectedTodo?.completed,
                    'has-text-danger': !selectedTodo?.completed,
                  })}
                >
                  {selectedTodo?.completed ? 'Done' : 'Planned'}
                </strong>

                {' by '}

                <a href={`mailto:${user?.email}`}>{user?.name}</a>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
