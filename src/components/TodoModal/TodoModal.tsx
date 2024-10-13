import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

interface Props {
  chosenTodo: Todo;
  onChoosingTodo: (todo: Todo | null) => void;
}

export const TodoModal: React.FC<Props> = ({ chosenTodo, onChoosingTodo }) => {
  const [todoOwner, setTodoOwner] = useState<User | null>(null);

  useEffect(() => {
    getUser(chosenTodo.userId).then(setTodoOwner);
  }, [chosenTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {todoOwner === null ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{chosenTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={() => onChoosingTodo(null)}
              type="button"
              className="delete"
              data-cy="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {chosenTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {chosenTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${todoOwner.email}`}>{todoOwner.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
