import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';
import classNames from 'classnames';

export class TodoList extends React.Component {
  state = {
    query: '',
    status: 'all',
  }

  changeQuery = (event) => {
    this.setState({ query: event.target.value });
  }

  setStatus = (event) => {
    this.setState({ status: event.target.value });
  }

  selectStatus = (todo) => {
    switch (this.state.status) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default: return 0;
    }
  }

  render() {
    const { todos, selectUser, selectedUserId } = this.props;
    const { query } = this.state;

    const filteredTodos = todos
      .filter(todo => todo.title && todo.title.toLowerCase()
        .includes(query.toLowerCase()))
      // eslint-disable-next-line no-shadow
      .filter((todo) => {
        switch (this.state.status) {
          case 'active':
            return !todo.completed;
          case 'completed':
            return todo.completed;
          default: return todo;
        }
      });

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <form>
          <label>
            <input
              className="form-control"
              type="text"
              name="text"
              placeholder="Search for todo"
              value={query}
              onChange={this.changeQuery}
            />
          </label>

          <select
            className="custom-checkbox"
            name="status"
            onChange={this.setStatus}
          >
            <option value="all">Show all todos</option>
            <option value="active">Show active todos</option>
            <option value="completed">Show completed todos</option>
          </select>
        </form>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map((todo) => {
              const itemClass = classNames('TodoList__item', {
                'TodoList__item--checked': todo.completed,
                'TodoList__item--unchecked': !todo.completed,
              });

              return (
                <li className={itemClass} key={todo.id}>
                  <label>
                    <input type="checkbox" defaultChecked={todo.completed} />
                    <p>{todo.title}</p>
                  </label>

                  <button
                    type="button"
                    className={classNames('TodoList__user-button', 'button',
                      { 'TodoList__user-button--selected':
                        todo.id === selectedUserId })}
                    onClick={() => {
                      selectUser(todo.userId);
                    }}
                  >
                    User&nbsp;#
                    {todo.userId}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  selectUser: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
};
