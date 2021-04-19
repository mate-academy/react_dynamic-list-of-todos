import React from 'react';
import './TodoList.scss';
import className from 'classnames';

export class TodoList extends React.Component {
  state = {
    filterTitle: '',
    filterSelect: 'Show All',
  }

  handleChange = (ev) => {
    const { name, value } = ev.target;

    this.setState({
      [name]: value,
    })
  }

  filterByTitle = (todos) => {
    const { filterTitle } = this.state;

    if (filterTitle.length === 0) {
      return todos;
    }

    return todos.filter(todo =>
      todo.title.toLowerCase().includes(filterTitle.toLowerCase())
    )
  }

  filterByStatus = (todos) => {
    const { filterSelect } = this.state;

    switch (filterSelect) {
      case 'Show All':
        return todos;
      case 'Show active':
        return todos.filter(todo =>
          !todo.completed)
      case 'Show completed':
        return todos.filter(todo =>
          todo.completed)
    }
  }

  filterTodos = (todos) => {
    return this.filterByStatus(this.filterByTitle(todos));
  }

  render() {
    const { filterTitle, filterSelect } = this.state;
    const { todos, selectUser } = this.props;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <form className="TodoList__form">
          <input
            name="filterTitle"
            value={filterTitle}
            onChange={(ev) => this.handleChange(ev)}
          />
          <select
            name="filterSelect"
            value={filterSelect}
            onChange={(ev) => this.handleChange(ev)}
          >
            <option value="Show All">Show All</option>
            <option value="Show active">Show active</option>
            <option value="Show completed">Show completed</option>
          </select>
        </form>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {this.filterTodos(todos).map(todo => (
              <li
                className={className('TodoList__item', {
                  'TodoList__item--checked': todo.completed === true,
                  'TodoList__item--unchecked': todo.completed === false,
                })}
                key={todo.id}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    readOnly
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
                  onClick={() => selectUser(todo.userId)}
                >
                  User&nbsp;#{todo.userId}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
