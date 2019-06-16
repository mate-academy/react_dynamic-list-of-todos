import React from 'react';

function User (props) {
    return (
      <td>
        <a className="name" href={`mailto:${props.email}`}>
          {props.name}
        </a>
      </td>
    );
}

export default User;
