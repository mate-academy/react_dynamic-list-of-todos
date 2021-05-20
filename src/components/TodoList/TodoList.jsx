import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';

export class TodoList extends React.Component {
  state = {
    title: '',
    select: 'All',
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  filterTodos() {
    const { title, select } = this.state;
    const { todos } = this.props;

    return todos.filter(todo => (
      todo.title && todo.title.toLowerCase().includes(title.toLowerCase())
    )).filter((todo) => {
      if (select !== 'All') {
        return select === 'Completed' ? todo.completed : !todo.completed;
      }

      return todo;
    });
  }

  render() {
    const { selectUser } = this.props;
    const { select } = this.state;

    const result = this.filterTodos();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div>
          <input
            type="text"
            name="title"
            placeholder="Searc"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <select
            name="select"
            value={select}
            onChange={e => this.handleChange(e)}
          >
            <option>All</option>
            <option>Active</option>
            <option>Completed</option>
          </select>
        </div>
        <div className="TodoList__list-container">

          <ul className="TodoList__list">
            {result.map(todo => (
              <li
                key={todo.id}
                className={
                  `TodoList__item
                   TodoList__item--${!todo.completed ? 'unchecked' : 'checked'}`
                }
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
                  onClick={() => selectUser(todo.userId)}
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
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  selectUser: PropTypes.func.isRequired,
};
