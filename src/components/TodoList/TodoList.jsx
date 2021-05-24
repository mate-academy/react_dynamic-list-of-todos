import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';

export class TodoList extends React.Component {
  state = {
    input: '',
    selectTodos: '',
    filterTodos: this.props.todos,
  }

  handleClick = (todoUserId, selectUserId, selectedUser) => {
    if (todoUserId === selectUserId) {
      selectedUser(0);
    } else {
      selectedUser(todoUserId);
    }
  };

  filteredTodos = (event) => {
    const { value } = event.target;

    this.setState({
      input: value,
      filterTodos: this.props.todos.filter(todo => todo.title.includes(value)),
    });
  }

  selectedTodos = (select) => {
    switch (select) {
      case 'Active':
        this.setState({
          filterTodos: this.props.todos.filter(todo => !todo.completed),
        });
        break;
      case 'Completed':
        this.setState({
          filterTodos: this.props.todos.filter(todo => todo.completed),
        });
        break;
      default:
      case 'All':
        this.setState({
          filterTodos: this.props.todos,
        });
    }
  }

  render() {
    const { filterTodos } = this.state;
    const { selectedUserId, selectUser } = this.props;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <input
            className="input"
            type="text"
            value={this.state.input}
            onChange={this.filteredTodos}
          />
          <select
            name="select"
            value={this.state.selectTodos}
            onChange={(event) => {
              this.setState({ selectTodos: (event.target.value) });
              this.selectedTodos(event.target.value);
            }}
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>

          <ul className="TodoList__list">
            {filterTodos.map(todo => (
              <li
                key={todo.id}
                className={`TodoList__item TodoList__item${todo.completed
                  ? '--checked'
                  : '--unchecked'}`}
              >
                <label>
                  <input type="checkbox" readOnly />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={
                    `TodoList__user-button
                    TodoList__user-button${todo.userId === selectedUserId
                      ? '--selected'
                      : ''}
                    button`}
                  type="button"
                  onClick={() => (
                    this.handleClick(todo.userId, selectedUserId, selectUser)
                  )}
                >
                  User&nbsp;
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
    title: PropTypes.string,
    id: PropTypes.number,
    userId: PropTypes.number,
    completed: PropTypes.bool,
  })).isRequired,
  selectUser: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
};
