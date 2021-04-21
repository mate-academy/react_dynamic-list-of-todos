import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Form } from '../Form';

export class TodoList extends React.Component {
  state = {
    inputTitle: '',
    defaultSelect: 'all',
  }

  handleChange = ({ target }) => {
    const { value, name } = target;

    this.setState({
      [name]: value,
    });
  }

  filterByTitle = (todo) => {
    const { inputTitle } = this.state;

    if (todo.title !== null) {
      return todo.title.toLowerCase()
        .includes(inputTitle.toLowerCase());
    }

    return null;
  }

  filterByStatus = (todo) => {
    const { defaultSelect } = this.state;

    switch (defaultSelect) {
      case 'completed': return todo.completed;
      case 'active': return !todo.completed;
      default: return true;
    }
  }

  render() {
    const { todos, selectUser, selectedUserId } = this.props;
    const { inputTitle, defaultSelect } = this.state;

    const filterTodos = todos
      .filter(this.filterByTitle)
      .filter(this.filterByStatus);

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <Form
          inputTitle={inputTitle}
          defaultSelect={defaultSelect}
          handleChange={this.handleChange}
        />
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filterTodos.map(todo => (
              <li
                key={todo.id}
                className={classNames('TodoList__item', {
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': todo.completed,
                })}
              >
                <label>
                  <input type="checkbox" readOnly checked={todo.completed} />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classNames('TodoList__user-button', 'button', {
                    'TodoList__user-button--selected':
                    selectedUserId === todo.userId,
                  })}
                  type="button"
                  onClick={() => {
                    selectUser(todo.userId);
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
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      userId: PropTypes.number.isRequired,
    }),
  ).isRequired,
  selectUser: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
};
