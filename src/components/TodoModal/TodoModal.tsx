import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  todos: Todo[];
  selectedTodoId: number;
  selectTodo: (value: number) => number | void;
};

export const TodoModal: React.FC<Props> = ({
  todos,
  selectedTodoId,
  selectTodo,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const currentTodo = todos.find(todo => todo.id === selectedTodoId);

  useEffect(() => {
    const getData = async () => {
      if (currentTodo) {
        const UserFromServer = await getUser(currentTodo.userId);

        setUser(UserFromServer);
      }
    };

    getData();
  }, [selectedTodoId]);

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
              {`Todo #${selectedTodoId}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => selectTodo(0)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo?.completed
                ? (<strong className="has-text-success">Done</strong>)
                : (<strong className="has-text-danger">Planned</strong>)}

              {' by '}

              <a href={`mailto:${user.email}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
