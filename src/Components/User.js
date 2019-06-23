import React from 'react';


function User(props) {
    let user = props.users.filter((item) => item.id === props.id)[0];
    return (
        <div>
            {user.name}
        </div>
    )
}

export default User