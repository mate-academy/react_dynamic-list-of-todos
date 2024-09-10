import React from 'react';

type UserStatusProps = {
  isCompleted: boolean;
  user: {
    name: string;
    email: string;
  };
};

export const UserStatus: React.FC<UserStatusProps> = ({
  isCompleted,
  user,
}) => {
  return (
    <p className="block" data-cy="modal-user">
      <strong className={isCompleted ? 'has-text-success' : 'has-text-danger'}>
        {isCompleted ? 'Done' : 'Planned'}
      </strong>
      {' by '}
      <a href={`mailto:${user.email}`}>{user.name}</a>
    </p>
  );
};
