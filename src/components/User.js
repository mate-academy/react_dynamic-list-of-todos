import React, { Component } from "react";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {

    return (
      <td>
        {this.props.users.name}
      </td>
    );
  }
}

export default User;
