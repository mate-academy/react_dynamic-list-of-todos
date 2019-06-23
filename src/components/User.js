import React from 'react';

// class User extends React.Component {
//     render() {
//         return (
//             <td>{this.props.name}</td>
//         )
//     }
// }
function User(props) {
    return (
        <td>{props.name}</td>
    );
}
export default User;
