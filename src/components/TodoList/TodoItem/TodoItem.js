import React, { Component } from 'react';
import User from '../User/User';
import './TodoItem.css';

class TodoItem extends Component {
  constructor(props) {
    super(props);

    this._handleChange = this._handleChange.bind(this);
  }

  _handleChange() {
    this.props.onToggleCompleted(this.props.id);
  }

  render() {
    const { title, completed, user } = this.props;

    return (
      <section
        className={completed ? 'list-item green' : 'list-item red'}
      >
        <div className="item-subsection main-content">
          <label
            htmlFor="state-checkbox"
            className={
              completed
                ? 'todo-state item-subsection green'
                : 'todo-state item-subsection red'
            }
          >
            <input
              type="checkbox"
              name="state-checkbox"
              id="state-checkbox"
              checked={completed}
              onChange={this._handleChange}
            />
            {
              completed
                ? 'Done'
                : 'In process'
            }
          </label>
          <div className="todo-title  item-subsection">{title}</div>
        </div>
        <User {...user} />
      </section>
    );
  }
}

export default TodoItem;
