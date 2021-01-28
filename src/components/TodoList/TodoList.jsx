import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';

export class TodoList extends React.Component {
  state = {
    title: '',
    selectedTodos: 'All',
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { todos, changeCheked, selectedUserId } = this.props;
    const { title, selectedTodos } = this.state;

    const newTodos = todos.filter(item => (
      item.title.toLocaleLowerCase().includes(title.toLocaleLowerCase())
    )).filter((item) => {
      switch (selectedTodos) {
        case 'Active':
          return !item.completed;
        case 'Completed':
          return item.completed;
        default:
          return item;
      }
    });

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <label>
          Search by title:
          {' '}
          <input
            type="text"
            name="title"
            value={title}
            onChange={this.handleChange}
          />
        </label>

        <select
          name="selectedTodos"
          value={selectedTodos}
          onChange={this.handleChange}
        >
          <option>All</option>
          <option>Completed</option>
          <option>Active</option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {newTodos.map(item => (
              <li
                key={item.id}
                className={`TodoList__item ${item.completed
                  ? 'TodoList__item--checked'
                  : 'TodoList__item--unchecked'}
                `}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => {
                      changeCheked(item.id);
                    }}
                    readOnly
                  />
                  <p>{item.title}</p>
                </label>

                <button
                  className="
                    TodoList__user-button
                    TodoList__user-button--selected
                    button
                  "
                  type="button"
                  onClick={() => {
                    selectedUserId(item.userId);
                  }}
                >
                  User&nbsp;#
                  {item.userId}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  changeCheked: PropTypes.func.isRequired,
  selectedUserId: PropTypes.func.isRequired,
};
