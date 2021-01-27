import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    titleInput: '',
    filterBy: '',
  }

  handleChange = (e) => {
    const { name } = e.target;

    this.setState({
      [name]: e.target.value,
    });
  }

  render() {
    const { todos, selectUser } = this.props;
    const { titleInput, filterBy } = this.state;

    let filtered = todos
      .filter((todo) => {
        if (titleInput && todo.title) {
          return todo.title.toLowerCase().includes(titleInput.toLowerCase());
        }

        return todo;
      });

    if (filterBy) {
      filtered = filtered.filter((todo) => {
        switch (filterBy) {
          case 'active':
            return !todo.completed;

          case 'completed':
            return todo.completed;

          default:
            return todo;
        }
      });
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <input
          type="text"
          name="titleInput"
          placeholder="Input title*"
          value={titleInput}
          onChange={this.handleChange}
        />
        <select
          className="select-goods"
          name="filterBy"
          onChange={this.handleChange}
          value={filterBy}
        >
          <option value="">choose:</option>
          <option value="all">all</option>
          <option value="active">active</option>
          <option value="completed">completed</option>
        </select>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {
              filtered.map((todo, i) => (
                <li
                  key={todo.id}
                  className={`TodoList__item TodoList__item--${todo.completed
                    ? 'checked' : 'unchecked'}`}
                >
                  <label>
                    <input
                      type="checkbox"
                      name={i}
                      checked={todo.completed}
                      readOnly

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
                    onClick={() => selectUser(todo.userId)}
                  >
                    User&nbsp;
                    {todo.userId}
                  </button>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
  selectUser: PropTypes.func.isRequired,
};
