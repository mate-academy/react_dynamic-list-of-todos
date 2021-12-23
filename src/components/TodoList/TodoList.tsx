import { Component } from 'react';
import cn from 'classnames';
import { Todo } from '../../react-app-env';
import './TodoList.scss';

type Props = {
  todos: Todo[];
  selectedUserId: number;
  onSelectUser: (userId: number) => void;
};

type State = {
  query: string,
  sortBy: string,
};

export class TodoList extends Component<Props, State> {
  state: State = {
    query: '',
    sortBy: 'all',
  };

  handleSearch = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name === 'query') {
      this.setState({ query: value });
    }

    if (name === 'sortBy') {
      this.setState({ sortBy: value });
    }
  };

  render() {
    const { todos, selectedUserId, onSelectUser } = this.props;
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
          <label>
            <input
              className="TodoList__input"
              type="text"
              name="query"
              value={query}
              onChange={this.handleSearch}
              placeholder="Search by title"
            />
          </label>
          <select
            className="TodoList__select"
            name="sortBy"
            value={sortBy}
            onChange={this.handleSearch}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>

          <ul className="TodoList__list">
            {filteredTodos.map((todo) => (
              <li
                key={todo.id}
                className={cn(
                  'TodoList__item',
                  {
                    'TodoList__item--checked': todo.completed,
                  },
                  {
                    'TodoList__item--unchecked': !todo.completed,
                  },
                )}
              >
                <label htmlFor="todoStatus">
                  <input type="checkbox" checked={todo.completed} readOnly />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={cn('TodoList__user-button button', {
                    'TodoList__user-button--selected':
                      todo.userId === selectedUserId,
                  })}
                  type="button"
                  onClick={() => onSelectUser(todo.userId)}
                >
                  {`User&nbsp;#${todo.userId}`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
