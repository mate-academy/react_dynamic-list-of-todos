import React from 'react';

class User extends React.Component {
  render () {
    return (
      <td><a className="name" href={`mailto:${this.props.email}`}>{this.props.name}</a></td>
    );
  }
}

export default User;
