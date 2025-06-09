import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import cn from 'classnames';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  selectedTodo: Todo | null;
  setIsModalShown: (isShown: boolean) => void;
  setSelectedTodo: (selectedTodo: Todo | null) => void;
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  setIsModalShown,
  setSelectedTodo,
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  const handleModalShown = () => {
    setIsModalShown(false);
    setSelectedTodo(null);
  };

  useEffect(() => {
    if (selectedTodo) {
      setIsUserLoaded(false);
      getUser(selectedTodo.userId).then(user => {
        setSelectedUser(user);
        setIsUserLoaded(true);
      });
    }
  }, [selectedTodo?.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!isUserLoaded ? (
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
              onClick={handleModalShown}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={cn({
                  'has-text-danger': !selectedTodo?.completed,
                  'has-text-success': selectedTodo?.completed,
                })}
              >
                {!selectedTodo?.completed ? `Planned` : `Done`}
              </strong>

              {' by '}

              <a href="mailto:Sincere@april.biz">{selectedUser?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
