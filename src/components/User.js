import React, { Component } from 'react'

export default class User extends Component {
  render() {
    return (
      <td><a href={this.props.user.email}>{this.props.user.name}</a></td>
    )
  }
}
