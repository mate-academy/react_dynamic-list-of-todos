import React from 'react';
import PropTypes from 'prop-types';

class TodoFilter extends React.Component {
  static propTypes = {
    onFilterClick: PropTypes.func.isRequired,
  };

  state = {
    selected: '',
  };

  filterTodo = (event) => {
    event.preventDefault();
    const activeFilter = event.target.href.split('#').slice(-1)[0];

    this.setState({ selected: activeFilter });
    this.props.onFilterClick(activeFilter);
  };

  isActive = value => (value === this.state.selected ? 'active' : '');

  render() {
    return (
      <div className="btn-group">
        <ul className="nav nav-pills">
          <li className="nav-item">
            <a
              className={`nav-link ${this.isActive('active')}`}
              href="#active"
              onClick={this.filterTodo}
            >
              Active
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${this.isActive('completed')}`}
              href="#completed"
              onClick={this.filterTodo}
            >
              Completed
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${this.isActive('')}`}
              href="#"
              onClick={this.filterTodo}
            >
              All
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default TodoFilter;
