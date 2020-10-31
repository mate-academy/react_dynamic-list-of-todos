import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class TodoList extends React.Component {
  state = {
    titleName: '',
    select: 'all',
  }

  titleFilter = (event) => {
    this.setState({ titleName: event.target.value });
  }

  selectFilter = (event) => {
    this.setState({ select: event.target.value });
  }

  render() {
    let { todos } = this.props;
    const { selectUser, changeStatus } = this.props;
    const { titleName, select } = this.state;

    if (titleName) {
      todos = todos
        .filter(({ title }) => title !== null
          && title.toLowerCase().includes(titleName.toLowerCase()));
    }

    if (select !== 'all') {
      select === 'active'
        ? todos = todos.filter(todo => todo.completed === false)
        : todos = todos.filter(todo => todo.completed === true);
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <label>
          Filter by title:
          <input
            placeholder="enter name"
            onChange={event => this.titleFilter(event)}
          />

        </label>
        <label>
          Select todos:
          <select
            onChange={event => this.selectFilter(event)}
          >
            <option value="all">All</option>
            <option value="active">Not completed</option>
            <option value="completed">Completed</option>
          </select>
        </label>
        <button
          className="random_users_button"
          type="button"
          onClick={() => this.props.shuffleArray(todos)}
        >
          Random users
        </button>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todos.map(todo => (
              <li
                key={todo.id}
                className={classNames('TodoList__item',
                  (todo.completed === true)
                    ? 'TodoList__item--checked'
                    : 'TodoList__item--unchecked')}
              >
                <label>
                  <input
                    type="checkbox"
                    readOnly
                    checked={todo.completed}
                    onChange={() => changeStatus(todo.id)}
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className="
                    TodoList__user-button
                    TodoList__user-button--selected
                    button
                  "
                  type="button"
                  onClick={() => selectUser(todo.userId)}
                >
                  {`User #${todo.userId}`}
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
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectUser: PropTypes.func.isRequired,
  shuffleArray: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
};
