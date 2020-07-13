import React from 'react';
import classNames from 'classnames';
import User from './User';

type Props = {
  todo: TodoProps;
};

const Todo: React.FC<Props> = ({ todo }) => {
  return (
    <>
      <div className={classNames('card', 'text-white', 'mb-3', 'gg', { 'bg-success': todo.completed, 'bg-danger': !todo.completed })}>
        <div className="card-header">{todo.title}</div>
        <div className="card-body">
          <h5 className="card-title">{todo.completed ? <p>Status: completed</p> : <p>Status: not completed</p>}</h5>
          <p className="card-text"><User user={todo.user} /></p>
        </div>
      </div>
    </>
  );
};

export default Todo;
