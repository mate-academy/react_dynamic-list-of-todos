import React from 'react';
import { Todo } from '../helpers/api';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => (
  <div
    className="card text-white bg-primary mb-3"
    style={
      {
        width: '400px',
        height: '175px',
        margin: '15px',
      }
    }
  >
    <div className="card-header">
      Status:
      {
        todo.completed
          ? ' Finished'
          : ' Active'
      }
    </div>
    <div className="card-body">
      <h5 className="card-title">{todo.user ? todo.user.name : 'unknown'}</h5>
      <p className="card-text">{todo.title}</p>
    </div>
  </div>
);
