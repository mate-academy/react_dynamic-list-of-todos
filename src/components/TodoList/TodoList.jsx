import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    selectValue: '',
    inputValue: '',
  }

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
    });
  }

  hadnleSelect = (event) => {
    const { value } = event.target;

    this.setState({
      selectValue: value,
    });
  }

  render() {
    const { selectUser, todos } = this.props;
    const { selectValue, inputValue } = this.state;
    const options = ['all', 'active', 'completed'];

    function filterTodos(items) {
      switch (selectValue) {
        case 'active':
          return items.filter(item => item.completed === false);
        case 'completed':
          return items.filter(item => item.completed === true);
        default:
          return items.filter(item => (
            item.title.toLowerCase().includes(inputValue)
          ));
      }
    }

    const visibleTodos = filterTodos(todos);

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <input
            name="inputValue"
            value={inputValue}
            placeholder="Search by title"
            onChange={this.handleChange}
          />
          <select
            name="selectValue"
            value={selectValue}
            onChange={this.handleChange}
          >
            {options.map(option => (
              <option key={option}>
                {option}
              </option>
            ))}
          </select>
          <ul className="TodoList__list">
            {visibleTodos.map(todo => (
              <li
                className="TodoList__item TodoList__item--unchecked"
                key={todo.id}
              >
                <label>
                  <input
                    type="checkbox"
                    readOnly
                  />
                  <p>{todo.title}</p>
                </label>
                <button
                  onClick={() => {
                    selectUser(todo.userId);
                  }}
                  className="
              TodoList__user-button
              TodoList__user-button--selected
              button
            "
                  type="button"
                >
                  {`User#${todo.userId}`}
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
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ),
  selectUser: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  todos: [],
};
