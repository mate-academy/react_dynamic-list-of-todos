import React, { FC } from 'react';
import { UsersTodo } from '../types';

interface Props {
  todo: UsersTodo;
}

export const TodoItem: FC<Props> = ({ todo }) => (
  <>
    <p>{`Title: ${todo.title}`}</p>
    <p>{`User: ${todo.user.name}`}</p>
    <p>{`Completed: ${todo.completed ? '+' : '-'}`}</p>
  </>
);
