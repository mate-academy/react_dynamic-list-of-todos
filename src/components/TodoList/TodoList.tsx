/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import classNames from 'classnames';
import './TodoList.scss';

import { getTodos } from '../../api/api';

type Props = {
  selectedUserId: number;
  selectUser: (id:number) => void;
};

type State = {
  todos: Todo[],
  searchQuery: string;
  todosFilterValue: string;
};

export class TodoList extends React.Component <Props, State> {
  state: State = {
    todos: [],
    searchQuery: '',
    todosFilterValue: 'all',
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({ todos });
  }

  render() {
    const { todos, searchQuery, todosFilterValue } = this.state;
    const { selectUser, selectedUserId } = this.props;

    const todosToDisplay = todos.filter(todo => {
      if (!todo.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      if (todosFilterValue === 'active' && todo.completed) {
        return false;
      }

      return !(todosFilterValue === 'completed' && !todo.completed);
    });

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__listСontainer">
          <form className="TodoList__form">
            <input
              className="TodoList__input TodoList__input--search"
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={event => (
                this.setState({ searchQuery: event.target.value })
              )}
            />
            <select
              className="TodoList__input TodoList__input--select"
              onChange={event => (
                this.setState({ todosFilterValue: event.target.value })
              )}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </form>
          <ul className="TodoList__list">
            {todosToDisplay.map(todo => (
              <li
                key={todo.id}
                className={
                  classNames(
                    'TodoList__item',
                    { 'TodoList__item--unchecked': !todo.completed },
                  )
                }
              >
                <label>
                  <input
                    checked={todo.completed}
                    type="checkbox"
                    readOnly
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  type="button"
                  className={classNames('TodoList__user-button', 'button',
                    `TodoList__user-button--${selectedUserId === todo.userId ? 'selected' : 'unselected'
                    }`)}
                  onClick={() => selectUser(todo.userId)}
                >
                  {`User ${todo.userId}`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
