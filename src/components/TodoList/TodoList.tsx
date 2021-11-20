import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

type Props = {
  todos: Todo[],
  onCheckted: (userId: number) => void,
  selectedUserId: number,
};

type State = {
  titleInput: string,
  sortBy: string,
};

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
    if (this.state.sortBy !== 'all') {
      if (this.state.sortBy === 'ready') {
        return todos.filter(todo => todo.completed === true);
      }

      return todos.filter(todo => todo.completed === false);
    }

    return todos;
  };

  getSearchTodos = (todos: Todo[]) => {
    const { titleInput } = this.state;

    if (titleInput) {
      return todos.filter(todo => todo.title.toLowerCase().includes(titleInput));
    }

    return todos;
  };

  render() {
    const { todos, onCheckted, selectedUserId } = this.props;
    const todosByStatus = this.getSortedBySelected(todos);
    const todosByInput = this.getSearchTodos(todosByStatus);

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <input
          type="text"
          name="sortByText"
          id="sortByText"
          placeholder="Search todo"
          value={this.state.titleInput}
          onChange={this.handleInputChange}
        />

        <select
          name="sortBySelect"
          id="sortBySelect"
          value={this.state.sortBy}
          onChange={this.handleSelectedChange}
        >
          <option value="all">
            Show all
          </option>
          <option value="ready">
            Show complited
          </option>
          <option value="notReady">
            Show not complited
          </option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todosByInput.map(todo => (
              <li
                key={todo.id}
                className={classNames('TodoList__item',
                  { 'TodoList__item--unchecked': todo.completed === false },
                  { 'TodoList__item--checked': todo.completed === true })}
              >
                <>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
                <label>
                  <input type="checkbox" readOnly />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classNames('TodoList__user-button', 'button',
                    { 'TodoList__user-button--selected ': todo.userId === selectedUserId })}
                  type="button"
                  onClick={() => onCheckted(todo.userId)}
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
