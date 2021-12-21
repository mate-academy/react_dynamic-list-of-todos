import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../react-app-env';

import './TodoList.scss';

type Props = {
  todos: Todo[];
  selectedUserId: number;
  onSelect: (userId: number) => void;
};

type State = {
  query: string,
  sortBy: string,
};

export class TodoList extends React.Component<Props, State> {
  state = {
    query: '',
    sortBy: 'all',
  };

  handleChange = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    } as Pick<State, 'query' | 'sortBy'>);
  };

  render() {
    const { todos, selectedUserId, onSelect } = this.props;
    const { query, sortBy } = this.state;

    const filteredTodos = todos
      .filter((todo) => {
        if (query) {
          return (
            todo.title !== null
            && todo.title.toLowerCase().includes(query.toLowerCase())
          );
        }

        return todo;
      })
      .filter((todo) => {
        if (sortBy === 'active') {
          return !todo.completed;
        }

        if (sortBy === 'completed') {
          return todo.completed;
        }

        return todo;
      });

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <label htmlFor="query">
            <input
              type="text"
              name="query"
              value={query}
              onChange={this.handleChange}
              placeholder="Search by title"
            />
          </label>

          <select
            name="sortBy"
            value={sortBy}
            onChange={this.handleChange}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>

          <ul className="TodoList__list">
            {filteredTodos.map((todo) => (
              <li
                key={todo.id}
                className={classNames(
                  'TodoList__item',
                  {
                    'TodoList__item--checked': todo.completed,
                  },
                  { 'TodoList__item--unchecked': !todo.completed },
                )}
              >
                <label htmlFor="todoStatus">
                  <input type="checkbox" checked={todo.completed} readOnly />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classNames('TodoList__user-button button', {
                    'TodoList__user-button--selected':
                      todo.userId === selectedUserId,
                  })}
                  type="button"
                  onClick={() => onSelect(todo.userId)}
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
