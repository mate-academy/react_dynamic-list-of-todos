import React, { FC } from 'react';
import { TodoItem } from '../TodoItem/TodoItem';

interface Props {
  todos: TodoWithUser[];
  sort(field: string): void;
}

export const TodoList: FC<Props> = (props) => {
  const { todos, sort } = props;

  return (
    <>
      <button
        type="button"
        onClick={() => sort('title')}
      >
      Sort by title
      </button>
      <button
        type="button"
        onClick={() => sort('completed')}
      >
      Sort by completed
      </button>
      <button
        type="button"
        onClick={() => sort('name')}
      >
      Sort by name
      </button>
      <TodoItem todos={todos} />


    </>
  );
};
