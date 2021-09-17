import React from 'react';
import classNames from 'classnames';
import './TodoList.scss';

type Props = {
  onUserSelection: (userId: number) => void;
  todos: Todo[];
};

type State = {
  query: string;
  filter: string;
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    query: '',
    filter: 'All',
  };

  handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ filter: event.target.value });
  };

  filterTodos = () => {
    const { todos } = this.props;
    const { query, filter } = this.state;

    let filteredTodos = todos.filter(todo => (todo.title
      && todo.title.toLowerCase().includes(query.toLowerCase())));

    filteredTodos = filteredTodos.filter(todo => {
      switch (filter) {
        case 'Active':
          return !todo.completed;
        case 'Completed':
          return todo.completed;
        case 'All':
        default:
          return todos;
      }
    });

    return filteredTodos;
  };

  render() {
    const { onUserSelection } = this.props;
    const { query, filter } = this.state;
    const filteredTodos = this.filterTodos();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__form">
          <input
            type="text"
            name="query"
            value={query}
            className="TodoList__item"
            placeholder="Search by title"
            onChange={this.handleQuery}
          />

          <select
            name="filter"
            value={filter}
            className="TodoList__item"
            onChange={this.handleFilter}
          >
            <option value="" disabled>
              Choose status type
            </option>
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <li
                key={todo.id}
                className={classNames(
                  'TodoList__item',
                  {
                    'TodoList__item--checked': todo.completed,
                    'TodoList__item--unchecked': !todo.completed,
                  },
                )}
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
                  onClick={() => {
                    onUserSelection(todo.userId);
                  }}
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
