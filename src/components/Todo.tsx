import React from 'react';


export const Todo: React.FC<Todo> = ({
  id, title, user, completed,
}) => (
  <li className="todo" key={id}>
    <span>{id}</span>
    <span>{user.name}</span>
    <span>{title}</span>
    {completed
      ? (<i className="material-icons green-text">check_circle</i>)
      : (<i className="material-icons orange-text">lens</i>)}
  </li>
);
