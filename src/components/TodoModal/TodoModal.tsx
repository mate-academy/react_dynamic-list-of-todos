import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

interface Props {
  selectedTodo: Todo | null;
  onSelectedTodo: (todo: Todo | null) => void;
}

export const TodoModal: React.FC<Props> = React.memo(
  ({ selectedTodo, onSelectedTodo }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
      if (selectedTodo) {
        getUser(selectedTodo.userId).then(setUser);
      }
    }, [selectedTodo]);

    const handleClose = () => {
      // setUser(null);
      onSelectedTodo(null);
    };

    return (
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />

        {!selectedTodo || !user ? (
          <Loader />
        ) : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #{selectedTodo.id}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => handleClose()}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {selectedTodo.title}
              </p>

              <p className="block" data-cy="modal-user">
                <strong
                  className={cn({
                    'has-text-success': selectedTodo.completed,
                    'has-text-danger': !selectedTodo.completed,
                  })}
                >
                  {selectedTodo.completed ? 'Done' : 'Planned'}
                </strong>

                {' by '}

                <a href={`mailto:${user?.email}`}>{user?.name}</a>
              </p>
            </div>
          </div>
        )}
      </div>
    );
  },
);

TodoModal.displayName = 'TodoModal';
