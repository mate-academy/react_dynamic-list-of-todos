import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  selectedTodoId: number,
  selectedUserId: number,
  setSelectedTodoId: (id: number) => void,
  setSelectedUserId: (id: number) => void,
  todos: Todo[],
};

export const TodoModal: React.FC<Props> = ({
  selectedTodoId,
  selectedUserId,
  setSelectedTodoId,
  setSelectedUserId,
  todos,
}) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUser(selectedUserId)
      .then(userFromServer => {
        setUser(userFromServer);
      });
  }, []);

  const findTodo = todos.filter(({ id }) => selectedTodoId === id);

  const handleReset = () => {
    setSelectedTodoId(0);
    setSelectedUserId(0);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          {findTodo.map(({ id, title, completed }) => (
            <React.Fragment key={id}>
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
                  onClick={handleReset}
                />
              </header>

              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">
                  {title}
                </p>

                <p className="block" data-cy="modal-user">
                  {completed
                    ? (<strong className="has-text-success">Done</strong>)
                    : (<strong className="has-text-danger">Planned</strong>)}

                  {' by '}

                  <a href={`mailto:${user.email}`}>
                    {user.name}
                  </a>
                </p>
              </div>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};
