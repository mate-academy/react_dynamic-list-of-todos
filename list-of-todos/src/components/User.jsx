import React, { Component } from 'react'

export default class User extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <td>
        <span><strong>{this.props.user.name}</strong></span>
        <span>{this.props.user.email}</span>
      </td>
    )
  }
}
