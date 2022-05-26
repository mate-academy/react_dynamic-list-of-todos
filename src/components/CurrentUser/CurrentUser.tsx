import React, { useCallback, useEffect, useState } from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api/api';
import { User } from '../../types/TodoType';

type Props = {
  selectedUserId: number,
  resetUserId: (id: number) => void,
};

export const CurrentUser: React.FC<Props> = ({
  selectedUserId,
  resetUserId,
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const getData = useCallback(async () => {
    const user = await getUser(selectedUserId);

    setSelectedUser(user);
  }, [selectedUserId]);

  useEffect(() => {
    getData();
  }, [selectedUserId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          Selected user:&nbsp;
          {selectedUser ? selectedUser.id : (<div />)}
        </span>
      </h2>
      <h3
        className="CurrentUser__name"
        data-cy="userName"
      >
        {selectedUser?.name || 'Error'}
      </h3>
      <p className="CurrentUser__email">
        {selectedUser?.email || 'Error'}
      </p>
      <p className="CurrentUser__phone">
        {selectedUser?.phone || 'Error'}
      </p>
      <button
        type="button"
        className="CurrentUser__clear
        button"
        onClick={() => resetUserId(0)}
      >
        Clear
      </button>
    </div>
  );
};
