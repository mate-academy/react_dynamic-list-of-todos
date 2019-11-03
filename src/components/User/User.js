import React, { Component } from 'react';

export default class User extends Component {
  render() {
    const { user } = this.props;
    return (
      <>
        <td>{user.name}</td>
        <td>
          <a href={`mailto:${user.email}`}
             className="text-white">{user.email}</a>
        </td>
      </>
    );
  }
}
