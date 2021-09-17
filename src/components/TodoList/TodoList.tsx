import React from 'react';
import classNames from 'classnames';
import './TodoList.scss';

interface Props {
  onUserSelection: (userId: number) => void;
  todos: Todo[];
}

interface State {
  query: string;
  sortTypes: SortBy;
}

enum SortBy {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

export class TodoList extends React.Component<Props, State> {
  state = {
    query: '',
    sortTypes: SortBy.all,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    const key: keyof State = name as keyof State;

    this.setState({
      [key]: value,
    } as Pick<State, keyof State>);
  };

  getVisibleTodos = () => {
    const { todos } = this.props;
    const { query, sortTypes } = this.state;
    const lowerQuery = query.toLowerCase();

    let visibleTodos = todos.filter(todo => todo.title.toLowerCase().includes(lowerQuery));

    visibleTodos = visibleTodos.filter((todo) => {
      switch (sortTypes) {
        case 'all':
          return todo;
        case 'active':
          return todo.completed !== true;
        case 'completed':
          return todo.completed === true;

        default:
          return todo;
      }
    });

    return visibleTodos;
  };

  render() {
    const { onUserSelection } = this.props;
    const { query, sortTypes } = this.state;
    const visibleTodos = this.getVisibleTodos();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <label htmlFor="TodoList__filter">
          <input
            id="TodoList__filter"
            className=""
            placeholder="Enter the key word"
            type="text"
            name="query"
            value={query}
            onChange={this.handleChange}
          />
        </label>

        <select
          className=""
          name="sortTypes"
          value={sortTypes}
          onChange={this.handleChange}
        >
          <option value={SortBy.all}>All</option>
          <option value={SortBy.active}>Active</option>
          <option value={SortBy.completed}>Completed</option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {visibleTodos.map((todo) => (
              <li
                key={todo.id}
                className={classNames('TodoList__item', {
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': todo.completed,
                })}
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
