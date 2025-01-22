import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  onTodoReset: (value: Todo | null) => void;
  selectedUserId: number;
  selectedTodo: Todo | null;
};

export const TodoModal: React.FC<Props> = ({
  onTodoReset: onTodoReset,
  selectedUserId,
  selectedTodo,
}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!selectedUserId) {
      return;
    }

    getUser(selectedUserId).then(userInfo => {
      setUsername(userInfo.name);
      setEmail(userInfo.email);
    });
  }, [selectedUserId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {username === '' || email === '' ? (
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

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={() => onTodoReset(null)}
              type="button"
              className="delete"
              data-cy="modal-close"
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
                {selectedTodo?.completed ? `Done` : `Planned`}
              </strong>

              {' by '}

              <a href={`mailto:${email}`}>{username}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
