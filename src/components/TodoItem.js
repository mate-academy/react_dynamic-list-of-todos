import React from 'react';
import User from './User';
import './TodoItem.css';

function TodoItem(props) {
    const {title, user} = props;
    return (
        <div className="todo-item">
            <div className="task">
                {title}
            </div>
            <User  user={user}/>
        </div>
    );
}

export default TodoItem;