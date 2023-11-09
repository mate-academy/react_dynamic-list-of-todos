import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  chosenTodo?: Todo | null;
  toggleModal: boolean;
  setChosenTodo: (chosenTodo: Todo | null) => void;
  setToggleModal: (toggleModal: boolean) => void;
};

export const TodoModal: React.FC<Props> = ({
  chosenTodo,
  setChosenTodo,
  toggleModal,
  setToggleModal,
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    if (chosenTodo) {
      getUser(chosenTodo.userId).then(user => setSelectedUser(user));
    }
  }, [chosenTodo]);

  return (
    <div className={`modal ${toggleModal ? 'is-active' : ''}`} data-cy="modal">
      {toggleModal && <div className="modal-background" />}
      {toggleModal && !selectedUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${chosenTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                setChosenTodo(null);
                setToggleModal(false);
              }}
            />
          </header>

          <div className="modal-card-body">
            {chosenTodo && (
              <p className="block" data-cy="modal-title">
                {chosenTodo?.title}
              </p>
            )}

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className={
                chosenTodo?.completed ? 'has-text-success' : 'has-text-danger'
              }
              >
                {chosenTodo?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${selectedUser?.email}`}>
                {selectedUser?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
