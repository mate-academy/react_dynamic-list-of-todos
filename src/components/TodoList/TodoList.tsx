import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

type Props = {
  visibleTodos: Todo[],
  selectedUserId: number;
  query: string;
  filterBy: string;
  selectUser: (userId: number) => void;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectorInput: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export class TodoList extends React.PureComponent<Props, {}> {
  onUserSelected = (userId: number) => {
    if (userId === this.props.selectedUserId) {
      return null;
    }

    return this.props.selectUser(userId);
  };

  render() {
    const {
      visibleTodos,
      query,
      filterBy,
      handleSearch,
      handleSelectorInput,
    } = this.props;

    return (

      <div className="TodoList">
        <h2 className="subtitle pb-2">Todos:</h2>
        <div className="control pb-2">
          <input
            type="text"
            id="search-query"
            className="input"
            placeholder="Search by title"
            value={query}
            onChange={handleSearch}
          />
        </div>

        <div className="select is-info">
          <select
            value={filterBy}
            onChange={handleSelectorInput}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="TodoList__list-container pt-2">
          <ul className="TodoList__list">
            {visibleTodos.map((todo) => (
              <li
                key={todo.id}
                className={classNames('TodoList__item',
                  {
                    'TodoList__item--unchecked': !todo.completed,
                    'TodoList__item--checked': todo.completed,
                  })}
              >
                <input type="checkbox" checked={todo.completed} readOnly />
                <p>{todo.title}</p>

                <button
                  className="
                    TodoList__user-button
                    button
                  "
                  type="button"
                  onClick={() => this.onUserSelected(+todo.userId)}
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
