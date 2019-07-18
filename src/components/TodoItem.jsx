import React from 'react';

function TodoItems({ todo }) {
  return (
    <li className="todo-item">
      <div>
        <div className="user-details">
          <div className="sidebar">
            <h2 className="user-name">{todo.user.name}</h2>
            <p className="user-info">
              <u>E-mail:</u> {todo.user.email}
            </p>
          </div>
        </div>
      </div>
      <label>
        <input type="checkbox" defaultChecked={todo.completed} />
        {todo.title}
      </label>
    </li>
  );
}

export default TodoItems;
