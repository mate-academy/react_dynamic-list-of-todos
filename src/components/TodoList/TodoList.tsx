import React from 'react';
import { Todo } from '../Todo/Todo';
import { TodoWithUserInterface } from '../../interfaces';

interface Props {
  todos: TodoWithUserInterface[];
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
