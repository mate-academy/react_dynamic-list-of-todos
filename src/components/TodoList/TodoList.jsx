import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    query: '',
    todoStatus: '',
  }

  handleChange = (event) => {
    const {
      name, value,
    } = event.target;

    this.setState({
      [name]: value,
    });
  }

  filterTodos(activities) {
    const { query, todoStatus } = this.state;

    switch (todoStatus) {
      case 'completed':
        return activities.filter(activity => activity.completed);
      case 'active':
        return activities.filter(activity => !activity.completed);
      default:
        return activities.filter(activity => (
          activity.title.toLowerCase().includes(query.toLowerCase())
        ));
    }
  }

  render() {
    const { todos, showUserInfo } = this.props;
    const { query, todoStatus } = this.state;

    const filteredTodos = this.filterTodos(todos);

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <input
          type="text"
          id="search-query"
          className="input"
          placeholder="Type todo title"
          name="query"
          value={query}
          onChange={this.handleChange}
        />
        {' '}
        <select
          name="todoStatus"
          value={todoStatus}
          onChange={this.handleChange}
        >
          <option value="">
            Choose a status
          </option>
          <option value="all">
            All
          </option>
          <option value="active">
            Active
          </option>
          <option value="completed">
            Completed
          </option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              todo.completed ? (
                <li
                  key={todo.id}
                  className="TodoList__item TodoList__item--unchecked"
                >
                  <label>
                    <input type="checkbox" readOnly />
                    <p>{todo.title}</p>
                  </label>

                  <button
                    className="
                      TodoList__user-button
                      TodoList__user-button--selected
                      button
                    "
                    type="button"
                    onClick={() => showUserInfo(todo.userId)}
                  >
                    User&nbsp;#
                    {todo.userId}
                  </button>
                </li>
              ) : (
                <li
                  key={todo.id}
                  className="TodoList__item TodoList__item--checked"
                >
                  <label>
                    <input type="checkbox" checked readOnly />
                    <p>{todo.title}</p>
                  </label>

                  <button
                    className="
                      TodoList__user-button
                      button
                    "
                    onClick={() => showUserInfo(todo.userId)}
                    type="button"
                  >
                    User&nbsp;#
                    {todo.userId}
                  </button>
                </li>
              )
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }),
  showUserInfo: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  todos: 'no todo yet',
};
