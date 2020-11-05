import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

export class TodoList extends React.Component {
  state = {
    title: '',
    filter: '',
    selectedId: '',
  }

  handleChange = (event, name) => {
    const { filterUser } = this.props;

    this.setState({ [name]: event.target.value });
    filterUser(event.target.value, name);
  }

  handleSelect = (event) => {
    const { filterUserByCompleted } = this.props;
    const { value } = event.target;

    this.setState({ filter: value });
    filterUserByCompleted(value);
  }

  handleSelectUser = (id, userId) => {
    this.props.selectUser(userId);
    this.setState({ selectedId: id });
  }

  render() {
    const { todos, shuffle } = this.props;
    const { title, filter, selectedId } = this.state;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div className="TodoList__form">
          <input
            type="text"
            name="title"
            value={title}
            placeholder="choose Todo Title"
            onChange={event => this.handleChange(event, 'title')}
            className="TodoList__input input"
          />
          <select
            value={filter}
            name="completed"
            onChange={this.handleSelect}
            className="TodoList__select select"
          >
            <option value="">filter by status</option>
            <option value="all">all</option>
            <option value="active">active</option>
            <option value="completed">completed</option>
          </select>
          <button
            type="button"
            onClick={shuffle}
            className="button button--randomize"
          >
            randomize
          </button>
        </div>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todos.map(todo => (
              <li
                className={ClassNames('TodoList__item', {
                  'TodoList__item--checked': todo.completed,
                  'TodoList__item--unchecked': !todo.completed,
                })}
                key={todo.id}
              >
                <label>
                  <input type="checkbox" />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={ClassNames(
                    'TodoList__user-button', 'button', {
                      'TodoList__user-button--selected': todo.id === selectedId,
                    },
                  )}
                  type="button"
                  onClick={() => this.handleSelectUser(todo.id, todo.userId)}
                >
                  {`User ${todo.userId}`}
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
      userId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selectUser: PropTypes.func.isRequired,
  filterUser: PropTypes.func.isRequired,
  filterUserByCompleted: PropTypes.func.isRequired,
  shuffle: PropTypes.func.isRequired,
};
