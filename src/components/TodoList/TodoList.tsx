/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

interface State {
  titleInput: string,
  sortBy: string,
}

interface Props {
  todos: Todo[],
  selectedUserId: number,
  chooseUser: (userId: number) => void,
  markTodo: (todoId: number) => void,
}

export class TodoList extends React.Component<Props, State> {
  state = {
    titleInput: '',
    sortBy: 'all',
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      titleInput: event.target.value.toLowerCase(),
    });
  };

  handleSelectedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      sortBy: event.target.value,
    });
  };

  getSortedBySelected = (todos: Todo[]) => {
    switch (this.state.sortBy) {
      case 'completed':
        return todos.filter(todo => todo.completed);

      case 'notCompleted':
        return todos.filter(todo => !todo.completed);

      default:
        return todos;
    }
  };

  getSearchTodos = (todos: Todo[]) => {
    if (this.state.titleInput) {
      return todos.filter(todo => todo.title.toLowerCase().includes(this.state.titleInput));
    }

    return todos;
  };

  render() {
    const {
      todos,
      chooseUser,
      selectedUserId,
      markTodo,
    } = this.props;
    const todosByStatus = this.getSortedBySelected(todos);
    const todosByInput = this.getSearchTodos(todosByStatus);

    return (
      <div className="TodoList">
        <h2>Todos</h2>

        <input
          type="text"
          name="sortByText"
          id="sortByText"
          placeholder="Search todo"
          value={this.state.titleInput}
          onChange={this.handleInputChange}
        />

        <select
          className="select"
          name="sortBySelect"
          id="sortBySelect"
          value={this.state.sortBy}
          onChange={this.handleSelectedChange}
        >
          <option value="all">
            Show all
          </option>
          <option value="completed">
            Show complited
          </option>
          <option value="notCompleted">
            Show not complited
          </option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todosByInput.map(todo => (
              <li
                key={todo.id}
                className={classNames('TodoList__item',
                  { 'TodoList__item--unchecked': !todo.completed },
                  { 'TodoList__item--checked': todo.completed })}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => markTodo(todo.id)}
                  />
                  <p>
                    {todo.title}
                  </p>
                </label>

                <button
                  className={classNames('TodoList__user-button', 'button',
                    { 'TodoList__user-button--selected ': todo.userId === selectedUserId })}
                  type="button"
                  onClick={() => chooseUser(todo.userId)}
                >
                  User
                  {' '}
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
