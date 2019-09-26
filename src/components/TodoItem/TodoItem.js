import React from 'react';
import { TodoItemProps } from '../PropTypes/PropTypes';
import User from '../User/User';
import './TodoItem.css';

const TodoItem = ({ todo }) => (
  <li className={todo.completed ? 'card bg--green' : 'card bg--red'}>
    <div>
      <User data={todo.user} />
    </div>
    <p className="card-content">{todo.title}</p>
  </li>
);

TodoItem.propTypes = TodoItemProps;

export default TodoItem;
