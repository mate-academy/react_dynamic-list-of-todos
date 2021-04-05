import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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
    const { todos, selectUser, userId } = this.props;
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
                key={todo.id}
                className={classNames('TodoList__item', {
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': todo.completed,
                })}
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
                  className={classNames('TodoList__user-button', 'button', {
                    'TodoList__user-button--selected': todo.userId === userId,
                  })}
                  type="button"
                  onClick={() => {
                    selectUser(todo.userId);
                  }}
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
      completed: PropTypes.bool,
    }),
  ),
  userId: PropTypes.number,
  selectUser: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  todos: [],
  userId: 0,
};
