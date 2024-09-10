import { FC } from 'react';
import { Todo } from '../../types/Todo';
import React from 'react';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[];
  selectedTodo: Todo | null;
  setSelectedTodo: (todo: Todo) => void;
};

export const TodoInfo: FC<Props> = ({
  todos,
  selectedTodo,
  setSelectedTodo,
}) => {
  return (
    <>
      {todos.map((todo: Todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          isSelected={todo.id === selectedTodo?.id}
          setSelectedTodo={setSelectedTodo}
        />
      ))}
    </>
  );
};
