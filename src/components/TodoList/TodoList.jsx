import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    query: '',
    selectedStatus: '',
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const { todos, userId, onChange } = this.props;
    const { query, selectedStatus } = this.state;

    let todosFiltered = todos
      .filter(todo => (todo
        && todo.title
        && todo.title.includes(query)));

    switch (selectedStatus) {
      case 'active':
        todosFiltered = todosFiltered
          .filter(todo => todo.completed === false);
        break;

      case 'completed':
        todosFiltered = todosFiltered
          .filter(todo => todo.completed === true);
        break;

      default:
        todosFiltered = [...todosFiltered];
        break;
    }

    return (
      <div className="TodoList">
        <div className="TodoList__inputs">
          <div className="TodoList__search-query">
            <label htmlFor="search-query" className="label">
              Search title:
            </label>

            <div className="control">
              <input
                type="text"
                name="query"
                id="search-query"
                className="input"
                placeholder="Type search word"
                value={query}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="TodoList__select-completed">
            <label htmlFor="select-completed">
              Completed:
              <br />
            </label>

            <select
              name="selectedStatus"
              id="select-completed"
              value={selectedStatus}
              onChange={this.handleChange}
            >
              <option value="all">all</option>
              <option value="active">active</option>
              <option value="completed">completed</option>
            </select>
            <br />
          </div>
        </div>

        <h2>Todos:</h2>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todosFiltered.map(todo => (
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
                    value={todo.completed || false}
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={
                    userId
                      ? 'TodoList__user-button--selected button'
                      : 'TodoList__user-button button'
                  }
                  type="button"
                  onClick={() => {
                    onChange(todo.userId);
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
  userId: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number,
      title: PropTypes.string,
    }).isRequired,
  ).isRequired,
};

TodoList.defaultProps = {
  userId: 0,
};
