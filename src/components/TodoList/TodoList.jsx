import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';
import classNames from 'classnames';

export class TodoList extends React.Component {
  state = {
    title: '',
    status: 'All',
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  shuffle = (arr) => {
    arr.sort(() => Math.round(Math.random() * 100) - 50);
    this.forceUpdate();
  }

  render() {
    const { todos } = this.props;
    const { title, status } = this.state;
    let prepearedTodoList;

    switch (status) {
      case 'All':
        prepearedTodoList = todos;
        break;
      case 'Completed':
        prepearedTodoList = todos.filter(todo => todo.completed === true);
        break;
      case 'Active':
        prepearedTodoList = todos.filter(todo => todo.completed === false);
        break;
      default:
        break;
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <input
          name="title"
          placeholder="input todo title"
          value={title}
          onChange={this.handleChange}
        />
        <select
          value={status}
          name="status"
          onChange={this.handleChange}
        >
          <option>All</option>
          <option>Completed</option>
          <option>Active</option>
        </select>
        <button
          type="button"
          onClick={() => this.shuffle(todos)}
        >
          Shuffle
        </button>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {prepearedTodoList
              .filter(todo => todo.title
                && (todo.title).includes(title))
              .map(todo => (
                <li
                  key={todo.id}
                  className={classNames('TodoList__item', {
                    'TodoList__item--checked': todo.completed,
                    'TodoList__item--unchecked': !todo.completed,
                  })
                }
                >
                  <label>
                    {todo.completed ? (
                      <input type="checkbox" checked readOnly />
                    ) : (
                      <input type="checkbox" disabled />
                    )}

                    <p>{todo.title}</p>
                  </label>
                  <button
                    className={classNames('button TodoList__user-button', {
                      // eslint-disable-next-line
                      'TodoList__user-button--selected': todo.userId === this.props.userId,
                    })}
                    type="button"
                    onClick={() => {
                      this.props.onSelectedUser(todo.userId);
                    }}
                  >
                    User #
                    {todo.userId}
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
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
  onSelectedUser: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};
