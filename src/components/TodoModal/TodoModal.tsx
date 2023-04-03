import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  onCLose: (todoId: number | null) => void;
  selectedTodo: Todo,
};

export const TodoModal: React.FC<Props> = React.memo(
  (props) => {
    const { onCLose, selectedTodo } = props;

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
      const fetchUser = async () => {
        setUser(await getUser(selectedTodo.userId));
      };

      fetchUser();
    }, []);

    return (
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />

        {!user ? (
          <Loader />
        ) : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${selectedTodo.id}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => onCLose(null)}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {selectedTodo.title}
              </p>

              <p className="block" data-cy="modal-user">
                <strong
                  className={
                    selectedTodo.completed
                      ? 'has-text-success'
                      : 'has-text-danger'
                  }
                >
                  {
                    selectedTodo.completed
                      ? 'Done'
                      : 'Planned'
                  }
                </strong>

                {' by '}

                <a href={`mailto:${user.email}`}>
                  {user.name}
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    );
  },
);
