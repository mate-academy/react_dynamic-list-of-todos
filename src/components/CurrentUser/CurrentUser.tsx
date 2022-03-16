import React, { useEffect, useState } from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api/api';

type Props = {
  selectedUserId: number,
  setSelectedUserId: (userId: number) => void,
  setSelectedTodoId: (todoId: number) => void,
};

export const CurrentUser: React.FC<Props> = React.memo(({
  selectedUserId,
  setSelectedUserId,
  setSelectedTodoId,
}) => {
  const [user, setUser] = useState<User>();

  const fetchUser = async () => {
    setUser(await getUser(selectedUserId));
  };

  useEffect(() => {
    fetchUser();
  }, [selectedUserId]);

  return (
    <>
      {user ? (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>{`Selected user: ${selectedUserId}`}</span>
          </h2>

          <h3 className="CurrentUser__name">{user.name}</h3>
          <p className="CurrentUser__email">{user.email}</p>
          <p className="CurrentUser__phone">{user.phone}</p>

          <button
            type="button"
            className="CurrentUser__clear button"
            onClick={() => {
              setSelectedUserId(0);
              setSelectedTodoId(0);
            }}
          >
            Clear
          </button>
        </div>
      ) : (
        <p>User not found</p>
      )}
    </>
  );
});
