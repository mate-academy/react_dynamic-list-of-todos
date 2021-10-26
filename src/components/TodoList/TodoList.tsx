import classNames from 'classnames';
import React from 'react';
import './TodoList.scss';

type Props = {
  todos: Todo[];
  selectedUserId: (id: number) => void,
};

type State = {
  searchQuery: string,
  sortBy: string,
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    searchQuery: '',
    sortBy: 'all',
  };

  render() {
    const { todos, selectedUserId } = this.props;
    const { searchQuery, sortBy } = this.state;
    let filtredTodos = todos.filter(todo => todo.title.includes(searchQuery));

    switch (sortBy) {
      case 'active':
        filtredTodos = filtredTodos.filter(todo => !todo.completed);
        break;

      case 'completed':
        filtredTodos = filtredTodos.filter(todo => todo.completed);
        break;

      default:
        break;
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <input
          type="text"
          value={searchQuery}
          onChange={
            (e) => this.setState({ searchQuery: e.target.value })
          }
        />
        <select
          value={sortBy}
          onChange={
            (e) => this.setState({ sortBy: e.target.value })
          }
        >
          <option value="all">all</option>
          <option value="active">active</option>
          <option value="completed">completed</option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filtredTodos.map(todo => (
              <li
                className={classNames('TodoList__item',
                  { 'TodoList__item--checked': todo.completed },
                  { 'TodoList__item--unchecked': !todo.completed })}
                key={todo.id}
              >
                <label htmlFor='todo'>
                  <input type="checkbox" id="todo" checked={todo.completed} readOnly />
                  <p>{todo.title}</p>
                </label>
                <button
                  className="TodoList__user-button button"
                  type="button"
                  onClick={() => selectedUserId(todo.userId)}
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
