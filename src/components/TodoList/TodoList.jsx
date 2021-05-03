import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    showList: 'all',
    titles: '',
    todos: this.props.todos,
  };

  filterByTitle = (todo) => {
    const { titles } = this.state;

    if (todo.title !== null) {
      return todo.title.toLowerCase()
        .includes(titles.toLowerCase());
    }

    return null;
  }

  filterByProgress = () => {
    const { showList, todos } = this.state;

    if (showList === 'completed') {
      return todos.filter(todo => todo.completed === true);
    }

    if (showList === 'active') {
      return todos.filter(todo => todo.completed === false);
    }

    return todos;
  }

  render() {
    const filteredTodos = this.filterByProgress().filter(this.filterByTitle);

    return (
      <form onSubmit={(event) => {
        event.preventDefault();
      }}
      >
        <div>
          <input
            name="title"
            type="text"
            placeholder="Title"
            onChange={event => (
              this.setState({
                titles: event.target.value,
              })
            )}
          />
          <select onChange={event => (
            this.setState({
              showList: event.target.value,
            }))}
          >
            <option value="all">all</option>
            <option value="active">active</option>
            <option value="completed">completed</option>
          </select>
        </div>
        <div className="TodoList">
          <h2>Todos:</h2>
          <div className="TodoList__list-container">
            <ul className="TodoList__list">
              {filteredTodos.map(todo => (
                <li
                  className={classnames(todo.completed
                    ? 'TodoList__item TodoList__item--checked'
                    : 'TodoList__item TodoList__item--unchecked')
                    }
                  key={todo.id}
                >
                  <label>
                    <input type="checkbox" checked={todo.completed} readOnly />
                    <p>
                      {todo.title}
                    </p>
                  </label>

                  <button
                    className="
                      TodoList__user-button
                      TodoList__user-button--selected
                      button
                    "
                    type="submit"
                    onClick={() => this.props.selectedUser(todo.userId)}
                  >
                    User&nbsp;#
                    {todo.userId}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </form>
    );
  }
}

TodoList.defaultProps = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      completed: '',
      createdAt: '',
      title: '',
      updatedAt: '',
      userId: '',
    }),
  ),
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      completed: PropTypes.bool,
      createdAt: PropTypes.string.isRequired,
      title: PropTypes.string,
      id: PropTypes.number.isRequired,
      updatedAt: PropTypes.string.isRequired,
      userId: PropTypes.number,
    }).isRequired,
  ),
  selectedUser: PropTypes.func.isRequired,
};
