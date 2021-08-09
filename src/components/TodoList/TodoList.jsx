import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import './TodoList.scss';

export class TodoList extends React.PureComponent {
  state = {
    filterByTitle: '',
    selectedStatus: 'all',
    todoId: 0,
  }

  selectUser = (todoId, userId) => {
    this.setState({ todoId });
    this.props.onSelect(userId);
  }

  handleFilterByTitle = (event) => {
    this.setState({
      filterByTitle: event.target.value,
    });
  }

  handleFilterByStatus = (event) => {
    this.setState({
      selectedStatus: event.target.value,
    });
  }

  setFilteredTodos = todos => todos
    .filter(todo => todo.title && todo.title.includes(this.state.filterByTitle))
    .filter((todo) => {
      switch (this.state.selectedStatus) {
        case 'completed':
          return todo.completed;
        case 'active':
          return !todo.completed;
        default:
          return true;
      }
    })

  render() {
    const { todos } = this.props;
    const { todoId, selectedStatus, filterByTitle } = this.state;
    const {
      selectUser,
      handleFilterByStatus,
      handleFilterByTitle,
      setFilteredTodos,
    } = this;
    const filteredTodos = setFilteredTodos(todos);

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <form>
            <label>
              Find a todo
              <input
                value={filterByTitle}
                onChange={handleFilterByTitle}
              />
            </label>
            <select
              value={selectedStatus}
              onChange={handleFilterByStatus}
            >
              <option value="all">
                All
              </option>
              <option value="completed">
                Completed
              </option>
              <option value="active">
                Active
              </option>
            </select>
          </form>
          <ul
            className="TodoList__list"
          >
            {filteredTodos.map((todo) => {
              const itemStatus = todo.completed
                ? 'TodoList__item TodoList__item--checked'
                : 'TodoList__item TodoList__item--unchecked';

              return (
                <li
                  key={todo.id}
                  className={itemStatus}
                >
                  <label>
                    <input
                      type="checkbox"
                      defaultChecked={todo.completed}
                    />
                    <p>{todo.title}</p>
                  </label>

                  <button
                    type="button"
                    className={cn(
                      'TodoList__user-button', 'button',
                      { 'TodoList__user-button-selected': todoId === todo.id },
                    )}
                    onClick={() => selectUser(todo.id, todo.userId)}
                  >
                    {`User#${todo.userId}`}
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
      userId: PropTypes.number,
      id: PropTypes.number,
      title: PropTypes.string,
      completed: PropTypes.bool,
    }),
  ),
  onSelect: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      userId: null,
      id: null,
      title: null,
      completed: false,
    }),
  ),
};
