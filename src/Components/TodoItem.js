import React from 'react';
import User from './User'

function TodoItem(props) {
    let { title, completed, user } = props;
    return (
        <li className={completed ? "done" : "not"}>
            <div className="left">{title}</div>
            <User user={user} />
        </li>
    )
}

export default TodoItem