import React from 'react';
import propTypes from 'prop-types';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    query: '',
    selectedFilterTodos: 'all',
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  render() {
    const { onSelected, todos } = this.props;
    const { query, selectedFilterTodos } = this.state;
    const finallyTodos = todos
      .filter(todo => todo.title.includes(query))
      .filter((todo) => {
        switch (selectedFilterTodos) {
          case 'active':
            return todo.completed;
          case 'completed':
            return !todo.completed;

          default: return todo;
        }
      });

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div className="TodoList__list-container">
          <form>
            <input
              type="text"
              placeholder="Search"
              name="query"
              onChange={this.handleChange}
              className="form-control"
            />
            <select
              value={selectedFilterTodos}
              name="selectedFilterTodos"
              onChange={this.handleChange}
              className="form-select"
            >
              <option>all</option>
              <option>active</option>
              <option>completed</option>
            </select>
          </form>
          <ul className="TodoList__list">
            {finallyTodos.map(todo => (
              <li
                className="TodoList__item TodoList__item--unchecked"
                key={todo.id}
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
                  onClick={() => onSelected(todo.userId)}
                >
                  {`User: ${todo.userId}`}
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
  todos: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      title: propTypes.string.isRequired,
      userId: propTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  onSelected: propTypes.func.isRequired,
};
