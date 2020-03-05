import React, { FC } from 'react';
import { TodoItem } from './TodoItem';

interface Props {
  todos: PreparedTodo[];
}

export const TodoList: FC<Props> = (props) => {
  const { todos } = props;

  return (
    <ul className="list-group">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
