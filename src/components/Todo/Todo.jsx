import React from 'react';
import { UserSelectButton } from '../UserSelectButton';
import { TodoShape } from '../../types';

export const Todo = ({
  userId,
  title,
  isCompleted,
  selectedUserId,
  onUserSelect,
}) => (
  <>
    <label>
      <input
        type="checkbox"
        checked={isCompleted}
        readOnly
      />
      <p>{title}</p>
    </label>
    <UserSelectButton
      userId={userId}
      selectedUserId={selectedUserId}
      action={onUserSelect}
    />
  </>
);

Todo.propTypes = TodoShape;
