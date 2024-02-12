import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  todos: Todo[];
  setSelectedTodo: (todo: null) => void;
  selectedTodo: Todo;
};

export const TodoModal: React.FC<Props> = ({
  todos,
  setSelectedTodo,
  selectedTodo,
}) => {
  const [user, setUser] = useState<User>();
  const chosenTodo = todos.find(todo => todo.id === selectedTodo.id);

  const getApiUser = async () => {
    if (chosenTodo) {
      const data = await getUser(chosenTodo.userId);

      setUser(data);
    }
  };

  useEffect(() => {
    getApiUser();
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
              {`Todo #${chosenTodo?.id}`}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setSelectedTodo(null)}
              aria-label="close-button"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {chosenTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {chosenTodo?.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

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
};
