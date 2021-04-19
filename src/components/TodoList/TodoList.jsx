import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export class TodoList extends React.PureComponent {
    state = {
      filteredTitle: '',
      selectedStatus: '',
    }

    handleChange = (event) => {
      const { value, name } = event.target;

      this.setState({
        [name]: value,
      });
    }

    searchedTodos = (todo) => {
      if (todo.title === null) {
        return todo.title;
      }

      return todo.title.includes(this.state.filteredTitle);
    }

    selectedByStatus = (todo) => {
      if (this.state.selectedStatus === 'completed') {
        return todo.completed;
      }

      if (this.state.selectedStatus === 'active') {
        return !todo.completed;
      }

      return todo;
    }

    render() {
      const { todos, selectUser, changeStatus } = this.props;

      const { filteredTitle, selectedStatus } = this.state;

      const filteredTodos = todos
        .filter(this.searchedTodos).filter(this.selectedByStatus);

      return (
        <div className="TodoList">
          <h2>Todos:</h2>
          <form>
            <div>
              <input
                name="filteredTitle"
                value={filteredTitle}
                placeholder="Filter"
                onChange={this.handleChange}
              />
            </div>

            <div>
              <select
                name="selectedStatus"
                value={selectedStatus}
                onChange={this.handleChange}
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>

          </form>

          <div className="TodoList__list-container">
            <ul className="TodoList__list">
              {filteredTodos.map(todo => (
                <li
                  key={todo.id}
                  className={classNames('TodoList__item', {
                    'TodoList__item--checked': todo.completed,
                    'TodoList__item--unchecked': !todo.completed,
                  })}
                >
                  <label>
                    <input
                      type="checkbox"
                      readOnly
                      checked={todo.completed}
                      onClick={() => changeStatus(todo.id)}
                    />
                    <p>{todo.title}</p>
                  </label>

                  <button
                    className="TodoList__user-button button
                  TodoList__user-button--selected"
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
      id: PropTypes.number,
      userId: PropTypes.number,
      title: PropTypes.string,
      completed: PropTypes.bool,
    }),
  ).isRequired,
  selectUser: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
};
