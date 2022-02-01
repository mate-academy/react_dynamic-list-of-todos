import React from 'react';
import classNames from 'classnames';

import './TodoList.scss';

type Props = {
  todos: Todo[],
  selectUser: (id: number) => void,
  selectedUserId: number,
};

type State = {
  searchQuery: string,
  filterBy: string,
};

export class TodoList extends React.Component<Props, State> {
  state = {
    searchQuery: '',
    filterBy: 'all',
  };

  handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({
      searchQuery: value,
    });
  };

  handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    this.setState({
      filterBy: value,
    });
  };

  getPreparedTodos = () => {
    const { searchQuery, filterBy } = this.state;
    const { todos } = this.props;

    let preparedTodos = todos.filter(todo => (
      todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    ));

    preparedTodos = preparedTodos.filter((todo) => {
      switch (filterBy) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        case 'all':
        default:
          return todo;
      }
    });

    return preparedTodos;
  };

  render() {
    const { searchQuery, filterBy } = this.state;
    const { selectUser } = this.props;

    const visibleTodos = this.getPreparedTodos();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <form className="TodoList__form" action="">
          <label className="TodoList__label" htmlFor="search">
            Search by title
            <input
              id="search"
              type="text"
              value={searchQuery}
              placeholder="Search"
              className="TodoList__input"
              onChange={this.handleChangeInput}
            />
          </label>
          <label className="TodoList__label" htmlFor="todoStatus">
            Show by status
            <select
              id="todoStatus"
              value={filterBy}
              className="TodoList__input"
              onChange={this.handleChangeSelect}
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="active">Active</option>
            </select>
          </label>
        </form>
        <div className="TodoList__list">
          <ul className="TodoList__list">
            {visibleTodos.map(todo => (
              <li
                key={todo.id}
                className={classNames(
                  'TodoList__item',
                  {
                    'TodoList__item--unchecked': !todo.completed,
                    'TodoList__item--checked': todo.completed,
                  },
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
                  className="button"
                  onClick={() => {
                    selectUser(todo.userId);
                  }}
                >
                  {`User #${todo.userId}`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
