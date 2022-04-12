import React, { memo, useEffect, useState } from 'react';
import { getUser } from '../../api';
import './CurrentUser.scss';

interface Props {
  id: number,
  onClearSelection: (id: number) => void
}

export const CurrentUser: React.FC<Props> = memo(({ id, onClearSelection }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(id)
      .then(person => setUser(person));
  }, [id]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title"><span>{`Selected user: ${user?.id}`}</span></h2>

      <h3 className="CurrentUser__name">{user?.name}</h3>
      <p className="CurrentUser__email">{user?.email}</p>
      <p className="CurrentUser__phone">{user?.phone}</p>

      <button
        type="button"
        className="CurrentUser__clear"
        onClick={() => onClearSelection(0)}
      >
        Clear
      </button>
    </div>
  );
});
