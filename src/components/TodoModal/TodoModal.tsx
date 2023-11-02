import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { TodoModalMessage } from '../TodoModalMessage/TodoModalMessage';

type Props = {
  selectedTodo: Todo,
  changeSelectedTodo: (value: null) => void,
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  changeSelectedTodo,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    id, title, userId, completed,
  } = selectedTodo;

  useEffect(() => {
    setIsLoading(true);
    getUser(userId)
      .then((foundUser) => setUser(foundUser))
      // eslint-disable-next-line
      .catch((error) => console.warn(error))
      .finally(() => setIsLoading(false));
  }, [selectedTodo]);

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
              {`Todo #${id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => changeSelectedTodo(null)}
            />
          </header>

          <TodoModalMessage
            title={title}
            completed={completed}
            user={user}
          />
        </div>
      )}
    </div>
  );
};
