import React, { FC } from 'react';
import { Todo } from '../Todo';

interface Props {
  allTodos: TodoWithUser[];
}

export const TodoList: FC<Props> = (props) => {
  const { allTodos } = props;

  return (
    <table className="table">
      <thead>
        <tr>
          <th className="cell cell--head">Name</th>
          <th className="cell cell--head">Title</th>
          <th className="cell cell--head">completed</th>
        </tr>
      </thead>
      <tbody>
        {allTodos.map(todo => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </tbody>
    </table>
  );
};
