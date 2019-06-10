import React, { Component } from 'react'

export default class User extends Component {
  render() {
    return (
      <td>{this.props.user.name}</td>
    )
  }
}
