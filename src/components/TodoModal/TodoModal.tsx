import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';

type Props = {
  isLoading: boolean;
  setIsLoading: (bool: boolean) => void,
  setIsHide: (bool: boolean) => void,
  selectedTodo: Todo;
  setSelectedTodo: (todo: Todo | null) => void,
};

export const TodoModal: React.FC<Props> = ({
  isLoading,
  setIsHide,
  setIsLoading,
  selectedTodo,
  setSelectedTodo,

}: Props) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const loadUser = async () => {
      const oneUser = await getUser(selectedTodo.userId);

      setIsLoading(false);
      setUser(oneUser);
    };

    loadUser();
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
              Todo #
              {selectedTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                setIsHide(true);
                setSelectedTodo(null);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {
                selectedTodo.completed
                  ? <strong className="has-text-success">Done</strong>
                  : <strong className="has-text-danger">Planned</strong>
              }

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
