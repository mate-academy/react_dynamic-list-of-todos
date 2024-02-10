import React from 'react';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList: React.FC = () => {
  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>
      <TodoItem />
    </table>
  );
};
