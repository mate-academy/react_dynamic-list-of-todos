import React from 'react';
import { PreparedTodo } from '../interfaces';
import { Todo } from './Todo';

interface Props {
  todosList: PreparedTodo[];
}

export const TodoList: React.FC<Props> = ({ todosList }) => (
  <>
    {todosList.map(todo => <Todo key={todo.id} todo={todo} />)}
  </>
);
