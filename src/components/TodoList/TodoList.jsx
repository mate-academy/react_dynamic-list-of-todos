import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';
import classNames from 'classnames';
import { Form } from '../Form/Form';

export class TodoList extends React.Component {
  state = {
    filteredTodos: this.props.todos,
  };

  handleClick = (todoUserId, selectedUserId, selectUser) => {
    if (todoUserId === selectedUserId) {
      selectUser(0);
    } else {
      selectUser(todoUserId);
    }
  }

  addFilterTodos = (filteredTodos) => {
    this.setState({ filteredTodos });
  }

  render() {
    const { filteredTodos } = this.state;
    const { todos, selectUser, selectedUserId } = this.props;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <Form
          todos={todos}
          addFilterTodos={this.addFilterTodos}
        />

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <li
                key={todo.id}
                className={classNames(
                  'TodoList__item',
                  { 'TodoList__item--unchecked': !todo.completed },
                  { 'TodoList__item--checked': todo.completed },
                )}
              >
                <label>
                  <input type="checkbox" readOnly />
                  <p>{todo.title}</p>
                </label>
                <button
                  className={classNames(
                    'button',
                    'TodoList__user-button',
                    { 'TodoList__user-button--selected':
                        todo.userId === selectedUserId },
                  )}
                  type="button"
                  onClick={() => {
                    this.handleClick(todo.userId, selectedUserId, selectUser);
                  }}
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
  todos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
    userId: PropTypes.number,
    completed: PropTypes.bool,
  })).isRequired,
  selectUser: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
};
