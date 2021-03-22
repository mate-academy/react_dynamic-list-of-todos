import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    selectQuery: '',
    inputQuery: '',
  }

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
    });
  }

  filterTodos(items) {
    const { selectQuery, inputQuery } = this.state;

    switch (selectQuery) {
      case 'active':
        return items.filter(item => !item.completed);
      case 'completed':
        return items.filter(item => item.completed);
      default:
        return items.filter(item => (
          item.title.toLowerCase().includes(inputQuery)
        ));
    }
  }

  render() {
    const { selectUser, todos } = this.props;
    const { selectQuery, inputQuery } = this.state;
    const options = ['all', 'active', 'completed'];

    const visibleTodos = this.filterTodos(todos);

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <input
            name="inputQuery"
            value={inputQuery}
            placeholder="Search by title"
            onChange={this.handleChange}
          />
          <select
            name="selectQuery"
            value={selectQuery}
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
                className={classNames('TodoList__item', {
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': todo.completed,
                })}
                key={todo.id}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
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
