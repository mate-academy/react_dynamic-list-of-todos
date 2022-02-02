import classNames from 'classnames';
import React from 'react';
import './TodoList.scss';

type Props = {
  todos: Todo[],
  onUserSelect: (newUserId: number) => void
  selectedUserId: number,
};

type State = {
  search: string,
  filter: string,
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    search: '',
    filter: 'nofilter',
  };

  handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ search: event.target.value });
  };

  handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ filter: event.target.value });
  };

  prepareTodos = () => {
    let { todos } = this.props;

    if (this.state.search) {
      todos = this.props.todos.filter(todo => todo.title.includes(this.state.search));
    }

    if (this.state.filter !== 'nofilter') {
      todos = this.state.filter === 'completed'
        ? todos.filter(todo => todo.completed === true)
        : todos.filter(todo => todo.completed === false);
    }

    return todos;
  };

  render() {
    const { onUserSelect, selectedUserId } = this.props;
    const preparedTodos = this.prepareTodos();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__search">
          <input
            type="text"
            placeholder="Search..."
            className="TodoList__searchbar"
            value={this.state.search}
            onChange={this.handleInput}
          />
          <select
            name=""
            id=""
            className="TodoList__selector"
            value={this.state.filter}
            onChange={this.handleSelect}
          >
            <option value="nofilter">all</option>
            <option value="active">active</option>
            <option value="completed">completed</option>
          </select>
        </div>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {preparedTodos.map(todo => (
              <li
                key={todo.id}
                className={
                  `TodoList__item ${todo.completed
                    ? 'TodoList__item--checked'
                    : 'TodoList__item--unchecked'}`
                }
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
