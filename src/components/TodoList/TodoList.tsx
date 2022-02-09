import classNames from 'classnames';

import React from 'react';
import './TodoList.scss';

type Props = {
  todos: Todo[],
  onUserSelect: (newUserId: number) => void,
  selectedUserId: number,
};

type State = {
  search: string,
  filterBy: string,
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    search: '',
    filterBy: 'no-filter',
  };

  handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ search: event.target.value });
  };

  handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ filterBy: event.target.value });
  };

  getPreparedTodos = () => {
    let { todos } = this.props;

    if (this.state.search) {
      todos = this.props.todos.filter(todo => todo.title.includes(this.state.search));
    }

    if (this.state.filterBy !== 'no-filter') {
      todos = (this.state.filterBy === 'completed')
        ? todos.filter(todo => todo.completed)
        : todos.filter(todo => !todo.completed);
    }

    return todos;
  };

  render() {
    const { onUserSelect, selectedUserId } = this.props;
    const preparedTodos = this.getPreparedTodos();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div>
          <input
            type="text"
            placeholder="Search..."
            value={this.state.search}
            onChange={this.handleInput}
            className="form-control"
          />
          <select
            value={this.state.filterBy}
            onChange={this.handleSelect}
            className="form-select"
          >
            <option value="no-filter">all</option>
            <option value="active">active</option>
            <option value="completed">completed</option>
          </select>
        </div>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {preparedTodos.map(todo => (
              <li
                key={todo.id}
                className={classNames(
                  'TodoList__item',
                  { 'TodoList__item--checked': todo.completed },
                  { 'TodoList__item--unchecked': !todo.completed },
                )}
              >
                <label htmlFor="isCompleted">
                  <input
                    id="isCompleted"
                    type="checkbox"
                    checked={todo.completed}
                    readOnly
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classNames(
                    'button',
                    'TodoList__user-button',
                    { 'TodoList__user-button--selected': todo.userId === selectedUserId },
                  )}
                  type="button"
                  onClick={() => onUserSelect(todo.userId)}
                >
                  {`User\xa0#${todo.userId}`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
