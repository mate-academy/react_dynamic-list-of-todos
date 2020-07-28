import React, { FC } from 'react';
import { PreparedTodos } from './interfaces';
import { TodoItem } from './TodoItem';

interface Props {
  todos: PreparedTodos[];
}

export const TodoList: FC<Props> = ({ todos }) => (
  <>
    <ol>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ol>
  </>
);
