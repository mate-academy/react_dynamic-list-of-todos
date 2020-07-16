import React from 'react';
import { Todo } from '../Todo/Todo';
import { TodoWithUser } from '../../interfaces';

interface Props {
  todos: TodoWithUser[];
}

export const TodoList: React.FC<Props> = (props) => {
  const { todos } = props;

  return (
    <ul className="list">
      {todos.map(todo => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
