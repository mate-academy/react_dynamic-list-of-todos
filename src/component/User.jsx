import React, { Component } from 'react';

export default class User extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="user-info">
        <h3>{this.props.name}</h3>
        <div>
          <a href={`mailto:${this.props.email}`}>
            {this.props.username}
          </a>
        </div>
      </div>
    );
  }
}
