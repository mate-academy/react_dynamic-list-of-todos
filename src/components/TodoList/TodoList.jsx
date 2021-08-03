import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    filterByTitle: '',
    selectedStatus: 'all',
    todoId: 0,
  }

  selectUser = (todoId, userId) => {
    this.setState({ todoId });
    this.props.selectUser(userId);
  }

  handleTodosByTitle = (event) => {
    this.setState({ filterByTitle: event.target.value });
  }

  handleTodosByStatus = (event) => {
    this.setState({ selectedStatus: event.target.value });
  }

  makeFilteredTodos = todos => todos
    .filter(todo => todo.title
      && todo.title.includes(this.state.filterByTitle))
    .filter((todo) => {
      switch (this.state.selectedStatus) {
        case 'completed':
          return todo.completed;
        case 'active':
          return !todo.completed;
        default:
          return true;
      }
    });

  render() {
    const { todos } = this.props;
    const { todoId, selectedStatus, filterByTitle } = this.state;
    const {
      selectUser,
      handleTodosByTitle,
      handleTodosByStatus,
      makeFilteredTodos,
    } = this;
    const filteredTodos = makeFilteredTodos(todos);

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <form>
            <label>
              Find a todo:
              <input
                value={filterByTitle}
                onChange={handleTodosByTitle}
              />
            </label>
            <select
              value={selectedStatus}
              onChange={handleTodosByStatus}
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
          <ul className="TodoList__list">
            {filteredTodos.map((todo) => {
              const itemClass = cn('TodoList__item', {
                'TodoList__item--checked': todo.completed,
                'TodoList__item--unchecked': !todo.completed,
              });

              return (
                <li
                  key={todo.id}
                  className={itemClass}
                >
                  <label>
                    <input
                      type="checkbox"
                      defaultChecked={todo.completed}
                    />
                    <p>{todo.title}</p>
                  </label>

                  <button
                    onClick={() => selectUser(todo.id, todo.userId)}
                    className={cn('TodoList__user-button', 'button',
                      { 'TodoList__user-button--selected':
                        todo.id === todoId })}
                    type="button"
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
  selectUser: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: null,
    completed: false,
    title: null,
    userId: null,
  })),
};
