import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Form } from '../Form';

export class TodoList extends React.Component {
  state = {
    filteredTodos: this.props.todos,
  };

  addFilterTodos = (filteredTodos) => {
    this.setState({ filteredTodos });
  };

  render() {
    const { filteredTodos } = this.state;
    const { todos, selectUser } = this.props;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <Form todos={todos} addFilterTodos={this.addFilterTodos} />

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <li
                key={todo.id}
                className={classNames('TodoList__item', {
                  'TodoList__item--checked': todo.completed,
                  'TodoList__item--unchecked': !todo.completed,
                })}
              >
                <label>
                  <input type="checkbox" readOnly checked={todo.completed} />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classNames('button', 'TodoList__user-button', {
                    'TodoList__user-button--selected': todo.completed,
                  })}
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

const TodosType = PropTypes.arrayOf(
  PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
    userId: PropTypes.number,
    completed: PropTypes.bool,
  }),
);

TodoList.propTypes = {
  todos: TodosType.isRequired,
  selectUser: PropTypes.func.isRequired,
};
