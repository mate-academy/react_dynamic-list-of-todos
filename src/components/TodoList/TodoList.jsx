import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';
import { Form } from '../Form';

export class TodoList extends React.Component {
  state = {
    filteredTodos: this.props.todos,
  }

  saveTodos = (todos) => {
    this.setState({
      filteredTodos: todos,
    });
  }

  render() {
    const { selectUser, todos } = this.props;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <Form
          todos={todos}
          saveTodos={this.saveTodos}
          userId={this.props.userId}
        />

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {this.state.filteredTodos.map(todo => (
              <li
                key={todo.id}
                className={`TodoList__item ${todo.completed === true
                  ? 'TodoList__item--checked'
                  : 'TodoList__item--unchecked'}`}
              >
                <label>
                  <input
                    type="checkbox"
                    readOnly
                    checked={`${todo.completed === true
                      ? 'checked'
                      : ''}`}
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className="TodoList__user-button button"
                  type="button"
                  onClick={() => {
                    selectUser(todo.userId);
                  }}
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
  userId: PropTypes.number.isRequired,
  selectUser: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool,
    }).isRequired,
  ),
};

TodoList.defaultProps = {
  todos: [],
};
