import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

interface Props {
  selected: Todo | null;
  handleSelected: (arg: Todo | null) => void;
  setSelectedUser: (arg: User | null) => void;
  selectedUser: User | null;
  loading: boolean;
}

export const TodoModal: React.FC<Props> = ({
  selected,
  handleSelected,
  setSelectedUser,
  selectedUser,
  loading,
}) => {
  const [closed, setClosed] = useState(true);

  const handleClosed = () => {
    setClosed(true);
    handleSelected(null);
    setSelectedUser(null);
  };

  useEffect(() => {
    if (selected) {
      setClosed(false);
    } else {
      setClosed(true);
    }
  }, [selected]);

  return (
    <div className={!closed ? 'modal is-active ' : 'modal'} data-cy="modal">
      <div className="modal-background" />

      {loading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{selected?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => handleClosed()}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selected?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selected?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${selectedUser?.email}`}>{selectedUser?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
