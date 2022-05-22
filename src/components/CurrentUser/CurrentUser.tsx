import React, {
  memo, useContext, useEffect, useState,
} from 'react';
import { getUserById } from '../../api/api';
import './CurrentUser.scss';
import { SelectUserIdContext } from '../../contexts/SelectUserIdContext';

export const CurrentUser: React.FC = memo(() => {
  const [user, setUser] = useState<User | null>(null);
  const { selectedUserId, setSelectedUserId } = useContext(SelectUserIdContext);

  useEffect(() => {
    getUserById(selectedUserId)
      .then(data => setUser(data));
  }, [selectedUserId]);

  return user && (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          {`Selected user: ${selectedUserId}`}
        </span>
      </h2>

      <h3 className="CurrentUser__name">{user.name}</h3>
      <p className="CurrentUser__email">{user.email}</p>
      <p className="CurrentUser__phone">{user.phone}</p>

      <button
        className="CurrentUser__clear button"
        type="button"
        onClick={() => setSelectedUserId(0)}
      >
        Clear
      </button>
    </div>
  );
});
