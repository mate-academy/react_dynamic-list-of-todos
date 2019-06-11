import User from './User';
import './TodoItem.css';
import React from 'react';

export default function TodoItem(props) {
  const { title, completed } = props;
  const { name, email } = props.userInfo;

  return (
    <div className='todo-item'>
      <p className='todo-list__title'>Title: {title}</p>
      <p className='todo-list__status'>Status: {completed}</p>
      <User name={name} email={email} />
    </div>
  );
}
