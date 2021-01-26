import React from 'react';
import './TodoList.scss';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export class TodoList extends React.Component {
  state = {
    inputValue: '',
    selectValue: '',
  }

  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  hendlerSelect = (event) => {
    this.setState({ selectValue: event.target.value });
  };

  render() {
    const { todos, checkInput, userID } = this.props;
    const { inputValue } = this.state;

    return (
      <div className="TodoList">
        <div>
          <h2>Sort for todos</h2>
          <div
            className="TodoList__inputField"
          >
            <input
              placeholder="Todo name"
              value={this.state.inputValue}
              onChange={this.handleInputChange}
            />
            <select
              className="TodoList__select"
              onChange={this.hendlerSelect}
            >
              <option disabled>select type</option>
              <option>all</option>
              <option>active</option>
              <option>completed</option>
            </select>
          </div>
        </div>
        <h2>Todos:</h2>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todos
              .filter(ele => ele.title !== null
                && ele.title.includes(inputValue))
              .filter((elem) => {
                if (this.state.selectValue === 'active') {
                  return elem.completed === false;
                }

                if (this.state.selectValue === 'completed') {
                  return elem.completed === true;
                }

                return elem;
              })
              .map(todo => (
                <li
                  key={Math.random()}
                  className={classnames('TodoList__item', {
                    'TodoList__item--checked': todo.completed,
                    'TodoList__item--unchecked': !todo.completed,
                  })}
                >
                  <label>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => checkInput(todo.id)}
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
                    onClick={() => {
                      userID(todo.userId);
                    }}
                  >
                    User#
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
    id: PropTypes.number.isRequired,
    userId: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
  })).isRequired,
  checkInput: PropTypes.func.isRequired,
  userID: PropTypes.func.isRequired,
};
