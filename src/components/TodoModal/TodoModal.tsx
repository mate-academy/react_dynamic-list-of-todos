import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

interface Props {
  setIsClickedId: (id: number | null) => void,
  todos: Todo[],
  isClickedId: number | null,
}

export const TodoModal: React.FC<Props> = ({
  todos,
  setIsClickedId,
  isClickedId,
}) => {
  const [shownUser, setShownUser] = useState<User | null>(null);
  const [isModalLoaderShown, setIsModalLoaderShown] = useState(false);

  const selectedTodo = todos.find(todo => todo.id === isClickedId);

  useEffect(() => {
    setIsModalLoaderShown(true);

    if (selectedTodo) {
      getUser(selectedTodo.userId).then((response) => {
        setShownUser(response);
        setIsModalLoaderShown(false);
      });
    }
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isModalLoaderShown ? (
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
              onClick={() => setIsClickedId(null)}
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

              <a href={`mailto:${shownUser?.email}`}>
                {shownUser?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
