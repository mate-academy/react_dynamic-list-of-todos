import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

interface Props {
  todo: Todo;
  onSelectTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
}

export const TodoModal: React.FC<Props> = ({ todo, onSelectTodo }) => {
  const [isLoad, setIsLoad] = useState(true);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getUser(todo.userId);

      setUser(result);
      setIsLoad(false);

      return result;
    };

    fetchData();
  }, [todo.userId]);

  const handleCloseButton = useCallback(() => {
    onSelectTodo(null);
  }, [onSelectTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoad ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleCloseButton}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo.completed
                ? (<strong className="has-text-success">Done</strong>)
                : (<strong className="has-text-danger">Planned</strong>)}

              {' by '}

              <a href={`mailto:${user?.email}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
