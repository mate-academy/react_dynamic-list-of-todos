import React, { Component } from 'react';

export default class TodoItem extends Component {
  render() {
    return (
      <article>
        <div>
          <h2>{this.props.item.title}</h2>
          <p>{this.props.item.user.name}</p>
          <p>{`${this.props.item.completed}`}</p>
        </div>
      </article>
    );
  }
}
