import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';
import { Form } from '../Form/Form';

export class TodoList extends React.Component {
  state = {
    filteredTodos: this.props.todos,
  };

  addFilterTodos = (filteredTodos) => {
    this.setState({ filteredTodos });
  }

  render() {
    const { filteredTodos } = this.state;
    const { todos, selectUser } = this.props;

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
                  onClick={() => selectUser(todo.userId)}
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
  todos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
    userId: PropTypes.number,
    completed: PropTypes.bool,
  })).isRequired,
  selectUser: PropTypes.func.isRequired,
};
