import React from 'react';
import User from './User'

function TodoItem(props) {
    let { userId, title, completed } = props;
    let id = userId;
    return (
        <div className="todo">
            <li className={completed ? "done" : "not"}>
                <div className="left">{title}</div>
                <User id={id} />
            </li>
        </div>
    )
}

export default TodoItem