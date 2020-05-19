import React from 'react';
import { TodoCard } from '../Todo/Todo';
import Todo from '../../Helpers/api';

type Props = {
  todos: Todo[];
};

export const TodosList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="todo__list">
      {todos.map(todo => (
        <TodoCard todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};
