import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppContext } from '../Context/AppContext';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

export const TodoModal = () => {
  const [user, setUser] = useState<User | undefined>();
  const {
    todos,
    setModalLoader,
    selectedTodoId,
    setSelectedTodoId,
  } = useAppContext();

  const selectedTodo = todos.find((todo: Todo) => {
    return todo.id === selectedTodoId;
  });

  useEffect(() => {
    setModalLoader(true);

    if (selectedTodo) {
      getUser(selectedTodo.userId)
        .then(setUser)
        .finally(() => setModalLoader(false));
    }
  }, [selectedTodoId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user && selectedTodoId > 0 ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                setUser(undefined);
                setSelectedTodoId(0);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}
              {user && (
                <a href={`mailto:${user.email}`}>
                  {user.name}
                </a>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
