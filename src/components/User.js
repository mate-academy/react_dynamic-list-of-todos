import React, { Component } from 'react';

export default class User extends Component {
  render() {
    const {name, email} = this.props.info;
    return (
      <div className='user'>
        <p className='user-name'>User name: {name}</p>
        <p className='user-email'>User email: {email}</p>
      </div>
    );
  }
}
