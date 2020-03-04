import React, { FC } from 'react';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  sortByTitle: () => void;
  sortByUser: () => void;
  sortByCompleted: () => void;
}

export const TodoList: FC<TodoListProps> = ({
  todos,
  sortByTitle,
  sortByUser,
  sortByCompleted,
}) => {
  return (
    <>
      <div className="buttons-wrapper">
        <button
          type="button"
          onClick={sortByTitle}
        >
          Sort by title
        </button>
        <button
          type="button"
          onClick={sortByUser}
        >
          Sort by user
        </button>
        <button
          type="button"
          onClick={sortByCompleted}
        >
          Sort by completeness
        </button>
      </div>
      <ul className="list">
        {todos.map((todo: Todo) => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </ul>
    </>
  );
};
