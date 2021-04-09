import React from 'react';
import PropTypes from 'prop-types';

import { Form } from '../Form/Form';

import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    filteredTodos: this.props.todos,
  }

  setTodos = (todos) => {
    this.setState({
      filteredTodos: todos,
    });
  }

  render() {
    const { showUserInfo } = this.props;
    const { filteredTodos } = this.state;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <Form
          todos={this.props.todos}
          setTodos={this.setTodos}
        />

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <li
                key={todo.id}
                className={`TodoList__item
                  ${todo.completed
                  ? 'TodoList__item--unchecked'
                  : 'TodoList__item--checked'}`}
              >
                <label>
                  <input
                    type="checkbox"
                    readOnly
                    checked={todo.completed}
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={`TodoList__user-button button
                    ${todo.completed
                    ? 'TodoList__user-button--selected'
                    : ''}`}
                  type="button"
                  onClick={() => showUserInfo(todo.userId)}
                >
                  User&nbsp;#
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
  todos: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }),
  showUserInfo: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  todos: 'no todo yet',
};
