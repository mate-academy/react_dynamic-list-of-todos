import React from 'react';
import './TodoList.scss';

import classNames from 'classnames';

type Props = {
  allTodos: Todo[],
  selectedUserId: number,
  selectUser: (selectedUserId: number) => void,
};

type State = {
  filterValue: string,
  sortBy: string,
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    filterValue: '',
    sortBy: '',
  };

  render() {
    const { filterValue, sortBy } = this.state;
    const { allTodos, selectedUserId, selectUser } = this.props;

    let todosForRender = allTodos;

    switch (sortBy) {
      case 'all':
        todosForRender = allTodos;
        break;

      case 'active':
        todosForRender = allTodos.filter(todo => todo.completed === false);
        break;

      case 'completed':
        todosForRender = allTodos.filter(todo => todo.completed === true);
        break;

      default:
        break;
    }

    if (filterValue) {
      todosForRender = todosForRender.filter(todo => todo.title.includes(filterValue));
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">

            {todosForRender.map(todo => (
              <li
                key={todo.id}
                className={classNames('TodoList__item', { 'TodoList__item--unchecked': todo.completed === false, 'TodoList__item--checked': todo.completed === true })}
              >
                <label htmlFor={todo.id.toString()}>
                  <input
                    id={todo.id.toString()}
                    type="checkbox"
                    readOnly
                    checked={todo.completed}
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classNames('TodoList__user-button', 'button', { 'TodoList__user-button--selected': todo.userId === selectedUserId })}
                  type="button"
                  onClick={() => selectUser(todo.userId)}
                >
                  {`User #${todo.userId}`}
                </button>
              </li>
            ))}
          </ul>

          <select
            name="sortBy"
            className="TodoList__select"
            onChange={(event) => this.setState({ sortBy: event.target.value })}
          >
            <option value="">Select filter</option>
            <option value="all">ALL</option>
            <option value="active">ACTIVE</option>
            <option value="completed">COMPLETED</option>
          </select>

          <label htmlFor="filter">
            <input
              id="filter"
              className="TodoList__filter"
              type="text"
              name="filterValue"
              value={filterValue}
              onChange={(event) => this.setState({ filterValue: event.target.value })}
            />
            Enter keyword
          </label>

        </div>
      </div>
    );
  }
}
