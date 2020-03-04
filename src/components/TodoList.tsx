import React, { FC } from 'react';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: TodoWithUser[];
}

export const TodoList: FC<TodoListProps> = ({ todos }) => {
  return (
    <>
      <ul className="list">
        {todos.map((todo: TodoWithUser) => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </ul>
    </>
  );
};
