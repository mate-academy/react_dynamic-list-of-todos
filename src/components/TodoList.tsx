import React, { FC } from 'react';
import { Todo } from './Todo';

interface Props {
  data: Todo[];
}

export const TodoList: FC<Props> = ({ data }) => {
  return (
    <>
      <h1>Todo List</h1>
      <ul className="card-list">
        {data.map(item => (
          <li className="card-item" key={item.id}>
            <>
              <Todo {...item} />
            </>
          </li>
        ))}
      </ul>
    </>
  );
}
