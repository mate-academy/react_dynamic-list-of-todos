import React, { FC } from 'react';
import { PreparedTodos } from '../../types';
import { Todo } from '../Todo/Todo';

interface Props {
  todosList: PreparedTodos
}

export const TodoList: FC<Props> = ({ todosList }) => (
  <>
    {todosList.map(todo => <Todo key={todo.id} todo={todo} />)}
  </>
);
