import React, { useMemo } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { LoadingError } from '../LoadingError';
import { ModalHead } from './components/ModalHead';

interface Props {
  loading: boolean;
  todo: Todo | null;
  user: User | null;
  onClose: () => void;
}

export const Modal: React.FC<Props> = ({
  user,
  todo,
  loading,
  onClose,
}) => {
  const isLoading = loading && <Loader />;

  const renderModalContent = useMemo(() => {
    if (!user) {
      return <LoadingError textError="user" />;
    }

    return (
      <>
        <p className="block" data-cy="modal-title">
          {todo?.title}
        </p>

        <p className="block" data-cy="modal-user">
          <strong
            className={`has-text-${todo?.completed ? 'success' : 'danger'}`}
          >
            {todo?.completed ? 'Done' : 'Planned'}
          </strong>

          {' by '}

          <a href={`mailto:${user?.email}`}>{user?.name}</a>
        </p>
      </>
    );
  }, [user, todo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {isLoading}

      {!loading && (
        <div className="modal-card">
          <ModalHead
            todo={todo}
            onClose={onClose}
          />
          <div className="modal-card-body">
            {renderModalContent}
          </div>
        </div>
      )}
    </div>
  );
};
