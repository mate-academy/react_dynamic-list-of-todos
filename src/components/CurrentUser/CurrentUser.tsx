import React, { useEffect, useState } from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api/todos';

type Props = {
  userId: number,
};

export const CurrentUser: React.FC<Props> = ({ userId }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const loadUser = async () => {
    const user = await getUser(userId);

    setSelectedUser(user);
  };

  useEffect(() => {
    loadUser();
  }, [userId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          {`Selected user: ${userId}`}
        </span>
      </h2>

      {selectedUser && (
        <>
          <h3 className="CurrentUser__name">{selectedUser.name}</h3>
          <p className="CurrentUser__email">{selectedUser.email}</p>
          <p className="CurrentUser__phone">{selectedUser.phone}</p>
        </>
      )}
    </div>
  );
};
