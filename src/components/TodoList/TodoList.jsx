import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';

export class TodoList extends React.Component {
  state = {
    query: '',
    select: 'All',
  }

  onChangeInput = (event) => {
    this.setState({
      query: event.target.value,
    });
  }

  onChangeSelect = (event) => {
    this.setState({
      select: event.target.value,
    });
  }

  filterList = () => (
    this.state.query.length > 0
      ? this.props.todos.filter(
        (todo) => {
          if (todo.title === null) {
            return false;
          }

          return todo.title.toLowerCase()
            .includes(this.state.query.toLowerCase());
        },
      )
      : this.props.todos
  )

  render() {
    const { selectUser } = this.props;
    let filteredTodos = this.filterList();

    if (this.state.select !== 'All') {
      filteredTodos = filteredTodos.filter(todo => (
        this.state.select === 'Completed'
          ? todo.completed
          : !todo.completed
      ));
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <input
          type="text"
          placeholder="Search todo"
          id="search-query"
          value={this.state.query}
          onChange={this.onChangeInput}
        />
        <select
          className="select"
          name="select"
          id="select"
          onChange={this.onChangeSelect}
        >
          <option
            value="All"
          >
            All
          </option>
          <option
            value="Completed"
          >
            Completed
          </option>
          <option
            value="Active"
          >
            Active
          </option>
        </select>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <li
                key={todo.id}
                className={
                  `TodoList__item
                  TodoList__item--${todo.completed ? 'checked' : 'unchecked'}`}
              >
                <label>
                  <input
                    type="checkbox"
                    defaultChecked={todo.completed}
                  />
                  <p>{todo.title}</p>
                </label>
                <button
                  className="
                    TodoList__user-button
                    TodoList__user-button--selected
                    button
                  "
                  type="button"
                  onClick={() => {
                    selectUser(todo.userId);
                  }}
                >
                  User&nbsp;
                  {todo.userId}
                </button>
              </li>
            ))
          }
          </ul>
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  selectUser: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
};
