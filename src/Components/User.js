import React from 'react';
import users from './users';

function User(props) {
    let user = users.filter((item) => item.id === props.id)[0];
    return (
        <div>
            {user.username}
        </div>
    )
}

export default User