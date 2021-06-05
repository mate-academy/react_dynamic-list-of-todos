import React from 'react';
import './TodoList.scss';

import PropTypes from 'prop-types';

export class TodoList extends React.Component {
  state = {
    query: '',
    filter: '',
  }

  render() {
    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div
          className="TodoList__filtersBlock"
        >
          <div
            className="TodoList__filtersInnerContainer"
          >
            <input
              placeholder="enter todo title"
              className="TodoList__search inputField"
              value={this.state.query}
              onChange={(event) => {
                this.setState({
                  query: event.target.value,
                });
              }}
            />
            <select
              className="TodoList__select inputField"
              onChange={(event) => {
                this.setState({
                  filter: event.target.value,
                });
              }}
            >
              <option>
                all
              </option>
              <option
                value="active"
              >
                active
              </option>
              <option
                value="completed"
              >
                completed
              </option>
            </select>
          </div>
        </div>
        <ul className="TodoList__list">
          {
            this.props.todos.filter(todo => (
              (todo.title !== null
              && todo.title.includes(this.state.query.toLocaleLowerCase()))
              || this.state.query.toLocaleLowerCase() === ''
            )).filter((todo) => {
              if (this.state.filter === 'active') {
                return !todo.completed;
              }

              if (this.state.filter === 'completed') {
                return todo.completed;
              }

              return true;
            }).map(todo => (
              <li
                className={todo.completed
                  ? 'TodoList__item TodoList__item--checked'
                  : 'TodoList__item TodoList__item--unchecked'
                }
                key={todo.id}
              >
                <label>
                  <input type="checkbox" checked={todo.completed} readOnly />
                  <p>{todo.title}</p>
                </label>

                <button
                  className="
                    TodoList__user-button
                    TodoList__user-button--selected
                    button
                  "
                  type="button"
                  onClick={this.props.chooseUser(todo.userId)}
                >
                  User&nbsp;#
                  {todo.userId}
                </button>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape().isRequired,
  ).isRequired,
  chooseUser: PropTypes.func.isRequired,
};
