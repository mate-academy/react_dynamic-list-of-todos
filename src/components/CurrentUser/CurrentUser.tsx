import React from 'react';
import { User } from '../../react-app-env';
import './CurrentUser.scss';

interface Props {
  users: User[];
  selectedUserId: number;
  onSetSelectedUserId: (number: number) => void;
}

export const CurrentUser: React.FC<Props> = ({
  users,
  selectedUserId,
  onSetSelectedUserId,
}) => {
  const getUser = (userss: User[]) => {
    return userss.find(user => user.id === selectedUserId);
  };

  const result = getUser(users);

  // eslint-disable-next-line no-console
  console.log(result);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          Selected user:
          {' '}
          {result?.id}
        </span>
      </h2>

      <h3 className="CurrentUser__name">{result?.username}</h3>
      <p className="CurrentUser__email">{result?.email}</p>
      <p className="CurrentUser__phone">{result?.phone}</p>
      <button
        className="TodoList__user-button button"
        type="button"
        onClick={() => {
          onSetSelectedUserId(0);
        }}
      >
        Clear
      </button>
    </div>
  );
};
