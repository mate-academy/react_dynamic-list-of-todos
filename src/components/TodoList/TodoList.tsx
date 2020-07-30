import React, { FC } from 'react';
import { PreparedTodo } from '../../interfaces';
import { TodoItem } from '../Todo/Todo';

interface Props {
  todos: PreparedTodo[];
}

export const TodoList: FC<Props> = props => {
  const { todos } = props;

  return (
    <div>
      {
        todos.map(
          todoItem => (
            <TodoItem key={todoItem.todo.id} content={todoItem} />
          ),
        )
      }
    </div>
  );
};
