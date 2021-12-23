/* eslint-disable react/prefer-stateless-function */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './TodoList.scss';
import { Todo } from '../../Types/Todo';

type Props = {
  todos: Todo[],
  onUserClick: (newUserId: number) => void,
};

type State = {
  searchBy: string,
  sortBy: string,
};

export class TodoList extends React.Component<Props, State> {
  state = {
    searchBy: '',
    sortBy: 'all',
  };

  search(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ searchBy: event.target.value });
  }

  sort(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ sortBy: event.target.value });
  }

  render(): React.ReactNode {
    let sortedList = this.props.todos.filter(todo => (
      todo.title.toLowerCase().includes(this.state.searchBy.toLowerCase())));

    switch (this.state.sortBy) {
      case 'all':
        break;
      case 'completed':
        sortedList = sortedList.filter(todo => todo.completed === true);
        break;
      case 'active':
        sortedList = sortedList.filter(todo => todo.completed === false);
        break;
      default:
        break;
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <form className="TodoList__form">
          <label>
            Show:
            <select
              className="TodoList__select form_element"
              value={this.state.sortBy}
              onChange={(event) => this.sort(event)}
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="active">Actve</option>
            </select>
          </label>
          <input
            className="TodoList__input form_element"
            type="text"
            name="searchBar"
            value={this.state.searchBy}
            onChange={(event) => this.search(event)}
          />
        </form>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {sortedList.map(
              todo => (
                <li
                  className="TodoList__item"
                  key={todo.id}
                >
                  <label>
                    <input type="checkbox" readOnly checked={todo.completed} />
                    <p>{todo.title}</p>
                  </label>

                  <button
                    className="
                  TodoList__user-button
                  button
                "
                    type="button"
                    onClick={() => this.props.onUserClick(todo.userId)}
                  >
                    {`User ${todo.userId}`}
                  </button>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    );
  }
}
