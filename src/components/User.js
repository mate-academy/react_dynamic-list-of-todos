import React from 'react';
import './User.css';

function User(props) {
    const {email, username} = props.user;
    return (
        <div className="user">
            <a href={email}>{username}</a>
        </div>
    );
}

export default User;