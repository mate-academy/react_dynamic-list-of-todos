import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

type Props = {
  todos: Todo[],
  userId: number,
  selectUser: (userId: number) => void,
};

type State = {
  query: string,
  filter: string,
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    query: '',
    filter: '',
  };

  render() {
    const { query, filter } = this.state;
    const { todos, userId, selectUser } = this.props;

    const visibleTodos = todos.filter(todo => {
      if (filter === 'active') {
        return !todo.completed
        && todo.title.toLowerCase().includes(query.toLowerCase());
      }

      if (filter === 'completed') {
        return todo.completed
        && todo.title.toLowerCase().includes(query.toLowerCase());
      }

      return todo.title.toLowerCase().includes(query.toLowerCase());
    });

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div className="TodoList__filter">
          <input
            type="text"
            id="search-query"
            className="TodoList__filter-item"
            placeholder="Type search word"
            onChange={(event) => {
              this.setState({
                query: event.target.value,
              });
            }}
          />
          <select
            name="filter"
            value={this.state.filter}
            className="TodoList__filter-item"
            onChange={(event) => {
              this.setState({ filter: event.target.value });
            }}
          >
            <option value="all">
              Show all
            </option>
            <option value="active">
              Show active
            </option>
            <option value="completed">
              Show completed
            </option>
          </select>
        </div>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {visibleTodos.map(todo => (
              <li
                key={todo.id}
                className={classNames(
                  'TodoList__item',
                  { 'TodoList__item--unchecked': !todo.completed },
                  { 'TodoList__item--checked': todo.completed },
                )}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  readOnly
                />
                <p>{todo.title}</p>
                <button
                  type="button"
                  className={classNames(
                    'button',
                    'TodoList__user-button',
                    { 'TodoList__user-button--selected': userId === todo.userId },
                  )}
                  onClick={() => selectUser(todo.userId)}
                >
                  User&nbsp;
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
