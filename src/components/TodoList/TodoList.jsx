import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    showTodos: 'all',
    serchByTitle: '',
  }

  chooseTodos = (selectBy, arr) => {
    const { serchByTitle } = this.state;
    const newArr = arr.filter(item => item.title.includes(serchByTitle));

    if (selectBy === 'active') {
      return newArr.filter(item => !item.completed);
    }

    if (selectBy === 'completed') {
      return newArr.filter(item => item.completed);
    }

    return newArr;
  }

  render() {
    const { todos, takeUserId } = this.props;
    const { serchByTitle, showTodos } = this.state;
    const newTodos = this.chooseTodos(showTodos, todos);

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <input
          type="text"
          value={serchByTitle}
          placeholder="Search todo"
          onChange={({ target }) => (
            this.setState({ serchByTitle: target.value.trimLeft() })
          )}
        />

        <select
          name="showTodos"
          value={showTodos}
          onChange={({ target }) => this.setState({ showTodos: target.value })}
        >
          <option value="all">all</option>
          <option value="active">active</option>
          <option value="completed">completed</option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {newTodos.map(item => (
              <li
                className={classNames({
                  TodoList__item: true,
                  'TodoList__item--checked': item.completed,
                  'TodoList__item--unchecked': !item.completed,
                })}
                key={item.id}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={item.completed}
                    readOnly
                  />
                  <p>{item.title}</p>
                </label>

                <button
                  className="
                    TodoList__user-button
                    TodoList__user-button--selected
                    button
                  "
                  type="button"
                  onClick={() => takeUserId(item.userId)}
                >
                  {`User #${item.userId}`}
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
    PropTypes.object.isRequired,
  ).isRequired,
  takeUserId: PropTypes.func.isRequired,
};
