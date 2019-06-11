import React from 'react';

export class User extends React.Component{
  render() {
    const {
      name
    } = this.props;
    return (
      <p>{name}</p>
    );
  }
}
