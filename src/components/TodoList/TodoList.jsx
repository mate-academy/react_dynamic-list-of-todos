import classNames from 'classnames';
import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';

export class TodoList extends React.Component {
  state = {
    inputValue: '',
    selectValue: '',
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { todos, getUserId, selectedUserId } = this.props;
    const { inputValue, selectValue } = this.state;
    const filtredTodos = todos
      .filter(todo => todo.title.includes(inputValue))
      .filter((todo) => {
        if (selectValue === 'Active') {
          return !todo.completed;
        }

        if (selectValue === 'Completed') {
          return todo.completed;
        }

        return todo;
      });

    return (
      <div className="TodoList">
        <h2>
          Todos:
          {filtredTodos.length}
        </h2>

        <div className="TodoList__inputs-container">
          <input
            className="TodoList__input"
            placeholder="Search"
            name="inputValue"
            value={inputValue}
            onChange={e => this.handleChange(e)}
          />

          <select
            className="TodoList__input"
            value={selectValue}
            name="selectValue"
            onChange={e => this.handleChange(e)}
          >
            <option>All</option>
            <option>Active</option>
            <option>Completed</option>
          </select>
        </div>

        <div className="TodoList__list-container">
          {filtredTodos.length
            ? (
              <ul className="TodoList__list">
                {filtredTodos.map(todo => (
                  <li
                    key={todo.id}
                    className={todo.completed
                      ? 'TodoList__item TodoList__item--checked'
                      : 'TodoList__item TodoList__item--unchecked'
                    }
                  >
                    <label>
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        readOnly
                      />
                      <p>{todo.title}</p>
                    </label>

                    <button
                      className={classNames(
                        'TodoList__user-button',
                        'button',
                        { 'TodoList__user-button--selected': (
                          selectedUserId !== todo.userId
                        ) },
                      )}
                      type="button"
                      onClick={() => getUserId(todo.userId)}
                    >
                      {`User #${todo.userId}`}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <h3>No todos</h3>
            )
          }
        </div>
      </div>
    );
  }
}

const TodoType = {
  completed: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape(TodoType).isRequired,
  ).isRequired,
  getUserId: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
};
