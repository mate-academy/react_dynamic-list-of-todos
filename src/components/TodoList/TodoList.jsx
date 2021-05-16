import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    title: '',
    filterOptions: [
      'All',
      'Active',
      'Completed',
    ],
    currentOptionIdx: 0,
    isRandom: false,
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  handleRandomize = () => {
    this.setState(state => ({
      isRandom: !state.isRandom,
    }));
  };

  shuffleTodos = todos => (
    todos.map(todo => ({
      sortKey: Math.random(),
      value: todo,
    }))
      .sort((a, b) => a.sortKey - b.sortKey)
      .map(todo => todo.value)
  );

  filterTodos = () => {
    const {
      title, filterOptions, currentOptionIdx,
    } = this.state;

    return this.props.todos.filter(todo => (
      todo.title && todo.title.match(new RegExp(title, 'i'))
    ))
      .filter((todo) => {
        switch (filterOptions[currentOptionIdx]) {
          case 'Completed':
            return todo.completed;
          case 'Active':
            return !todo.completed;
          default:
            return true;
        }
      });
  };

  render() {
    const {
      title, filterOptions, currentOptionIdx, isRandom,
    } = this.state;
    const { onSelectUser } = this.props;

    let modifiedTodos = this.filterTodos();

    if (isRandom) {
      modifiedTodos = this.shuffleTodos(modifiedTodos);
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <div className="TodoList__list-filter">
            <input
              type="text"
              name="title"
              value={title}
              onChange={this.handleChange}
              placeholder="Title"
            />

            <select
              name="currentOptionIdx"
              value={currentOptionIdx}
              onChange={this.handleChange}
            >
              {filterOptions.map((option, idx) => (
                <option
                  key={option}
                  value={idx}
                >
                  {option}
                </option>
              ))}
            </select>

            <button
              type="button"
              className="button"
              onClick={this.handleRandomize}
            >
              {isRandom ? 'Original order' : 'Randomize'}
            </button>
          </div>

          <ul className="TodoList__list">
            {modifiedTodos.map(todo => (
              <li
                key={todo.id}
                className={cn('TodoList__item', {
                  'TodoList__item--unchecked': !todo.completed,
                })}
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
                  className={cn(
                    'TodoList__user-button',
                    'TodoList__user-button--selected',
                    'button',
                  )}
                  type="button"
                  onClick={() => onSelectUser(todo.userId)}
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
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      userId: PropTypes.number,
      completed: PropTypes.bool,
      title: PropTypes.string,
    }),
  ),
  onSelectUser: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  todos: [],
};
