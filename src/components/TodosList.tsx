import React, { FC } from 'react';
import { PreparedTodos } from '../interfaces';
import { Todo } from './Todo';


interface Props {
  todos: PreparedTodos[];
  onSortTitle: () => void;
  onSortName: () => void;
  onSortStatus: () => void;
}

export const TodosList: FC<Props> = (props) => {
  const {
    todos,
    onSortName,
    onSortStatus,
    onSortTitle,
  } = props;

  return (
    <>
      <button type="button" onClick={onSortTitle}>Sort by title</button>
      <button type="button" onClick={onSortName}>Sort by name</button>
      <button type="button" onClick={onSortStatus}>Sort by status</button>
      <ul className="todos">
        {todos.map(todo => (
          <li key={todo.id} className="todo">
            <Todo todo={todo} />
          </li>
        ))}
      </ul>
    </>
  );
};
