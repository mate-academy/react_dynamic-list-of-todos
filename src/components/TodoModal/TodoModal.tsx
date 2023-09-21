import React from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { useUser } from '../../useUser';

type TodoModalProps = {
  chosenTodo: Todo;
  setChosenTodo: (todo: Todo | null) => void;
};

export const TodoModal: React.FC<TodoModalProps> = ({
  chosenTodo,
  setChosenTodo,
}) => {
  const { chosenUser, isLoading } = useUser(chosenTodo.userId);

  const handleOnClick = () => {
    setChosenTodo(null);
  };

  return (
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
              {`Todo #${chosenTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleOnClick}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {chosenTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">

              {chosenTodo.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}

              <a href={`mailto:${chosenUser?.email}`}>
                {chosenUser?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
