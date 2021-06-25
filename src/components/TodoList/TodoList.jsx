import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./TodoList.scss";

export class TodoList extends React.Component {
  state = {
    filterValue: "",
    selectValue: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { handleUserSelect } = this.props;
    let { todos } = this.props;
    const { filterValue, selectValue } = this.state;

    if (selectValue === "active") {
      todos = todos.filter((todo) => !todo.completed);
    }

    if (selectValue === "completed") {
      todos = todos.filter((todo) => todo.completed);
    }

    if (filterValue) {
      todos = todos.filter((todo) =>
        todo.title.includes(this.state.filterValue)
      );
    }

    return (
      <div className="TodoList">
        <input
          name="filterValue"
          type="text"
          placeholder="enter a todo"
          value={this.state.filterValue}
          onChange={this.handleChange}
        />
        <select
          name="selectValue"
          value={this.state.selectValue}
          onChange={this.handleChange}
        >
          <option value="all">all</option>
          <option value="active">active</option>
          <option value="completed">completed</option>
        </select>
        <h2>Todos:</h2>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todos.map((todo) => (
              <li
                className={classNames(
                  `TodoList__item ${
                    todo.completed
                      ? "TodoList__item--checked"
                      : "TodoList__item--unchecked"
                  }`
                )}
                key={todo.id}
              >
                <label>
                  <input type="checkbox" checked={todo.completed} readOnly />
                  <p>{todo.title}</p>
                </label>

                <button
                  className="
              TodoList__user-button
              TodoList__user-button--selected
              button
            "
                  type="button"
                  onClick={() => handleUserSelect(todo.userId)}
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
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleUserSelect: PropTypes.func.isRequired,
};
