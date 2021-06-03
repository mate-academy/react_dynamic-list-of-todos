import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    titleFilter: '',
    sortTodos: 'all',
  }

  titleChange = (event) => {
    this.setState({ titleFilter: event.target.value });
  }

  todosSort = (event) => {
    this.setState({ sortTodos: event.target.value });
  }

  render() {
    const { todos, hendleSelectUser } = this.props;
    const filtred = todos.filter(todo => todo.title && todo
      .title.includes(this.state.titleFilter))
      .filter((todo) => {
        switch (this.state.sortTodos) {
          case 'active':
            return todo.completed === false;
          case 'completed':
            return todo.completed === true;
          default:
            return todo;
        }
      });

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <input type="text" onChange={this.titleChange} placeholder="search" />
        <select value={this.state.sortTodos} onChange={this.todosSort}>
          <option value="all">all</option>
          <option value="active">active</option>
          <option value="completed">completed</option>
        </select>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filtred.map(todo => (
              <li className="TodoList__item TodoList__item--unchecked">
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
                  onClick={() => hendleSelectUser(todo.userId)}
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
  hendleSelectUser: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
};
