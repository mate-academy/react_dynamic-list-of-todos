import React, { useEffect } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import type { User } from '../../types/User';
import type { Todo } from '../../types/Todo';

type modalProps = {
  id: string;
  setModal: (item: string) => void;
  openedModal: Todo | null
  setOpenedModal: (item: Todo | null) => void
};

export const TodoModal: React.FC<modalProps> = ({ id, setModal, openedModal, setOpenedModal }: modalProps) => {
  const [user, setUser] = React.useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const userData = await getUser(Number(id));
      setUser(userData);
    };

    loadUser();
  }, [id]);

  console.log(openedModal)

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
              Todo #{openedModal?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button type="button" className="delete" data-cy="modal-close" onClick={() => {setModal(''); setOpenedModal(null)}}/>
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {openedModal?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className={`has-text-${openedModal?.completed === true ? 'success' : 'danger'}`}>{openedModal?.completed === true ? 'Done' : 'Planned'}</strong>

              {' by '}

              <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
