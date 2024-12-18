import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import cn from 'classnames';

interface PropsModal {
  todo: Todo | null;
  onClearSelectTodo: (todo: Todo | null) => void;
}

export const TodoModal: React.FC<PropsModal> = ({
  todo,
  onClearSelectTodo,
}) => {
  const [loaderModal, setLoaderModal] = useState(false);

  const [user, setUser] = useState<User>({
    id: 0,
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    setLoaderModal(true);

    if (todo) {
      getUser(todo.userId)
        .then(item => {
          setUser(item);
        })
        .finally(() => setLoaderModal(false));
    }
  }, [todo]);

  const handleCloseModal = () => {
    setUser({
      id: 0,
      name: '',
      email: '',
      phone: '',
    });
    onClearSelectTodo(null);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loaderModal ? (
        <Loader />
      ) : (
        todo && (
          <div className="modal-card">
            <header className="modal-card-head">
              <div className="modal-card-title" data-cy="modal-header">
                Todo #{todo.id}
              </div>
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={handleCloseModal}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todo.title}
              </p>
              <p className="block" data-cy="modal-user">
                <strong
                  className={cn({
                    'has-text-danger': !todo.completed,
                    'has-text-success': todo.completed,
                  })}
                >
                  {todo.completed ? 'Done' : 'Planned'}
                </strong>
                {' by '}
                <a href={`mailto:${user.email}`}>{user.name}</a>
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
};
