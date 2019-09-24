import React, { Component } from 'react';
import { TodoItemSortProps } from '../../constants/proptypes';

import './TodoItemSort.css';

class TodoItemSort extends Component {
  buttons = [
    { name: 'default', label: 'Default' },
    { name: 'title', label: 'Title' },
    { name: 'status', label: 'Status' },
    { name: 'user', label: 'User' },
  ];

  render() {
    const { sort, onSortChange } = this.props;

    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = sort === name;
      const clazz = isActive ? 'btn-info' : 'btn-outline-secondary';
      return (
        <button
          type="button"
          className={`btn ${clazz}`}
          key={name}
          onClick={() => onSortChange(name)}
        >
          {label}
        </button>
      );
    });

    return (
      <div className="btn-group">
        {buttons}
      </div>
    );
  }
}

TodoItemSort.propTypes = TodoItemSortProps;

export default TodoItemSort;
