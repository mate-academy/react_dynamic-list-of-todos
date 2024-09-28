import React, {useState, useEffect} from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';


type Props = {
  activeTodo: Todo;
  setActiveTodo: (todo: null) => void;
};

export const TodoModal: React.FC<Props> = ({
  activeTodo,
  setActiveTodo,
}) => {
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [activeUser, setActiveUser] = useState<User | null>(null);

  const closeModal = () => {
    setActiveTodo(null);
  };

  useEffect(() => {
    getUser(activeTodo.userId)
      .then(setActiveUser)
      .finally(() => { setIsModalLoading(false) })
  }, [activeTodo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isModalLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{activeTodo?.id}
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
              {activeTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {activeTodo.completed
                ? (<strong className="has-text-success">Done</strong>)
                : (<strong className="has-text-danger">Planned</strong>)
              }

              {' by '}

              <a href={`mailto:${activeUser?.email}`}>{activeUser?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
