import React from 'react';

export default function User(props) {
  return (
    <div className="user-info">
      <h3>{props.name}</h3>
      <div>
        <a href={`mailto:${props.email}`}>
          {props.username}
        </a>
      </div>
    </div>
  );
}
