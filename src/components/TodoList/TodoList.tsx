import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import { getTodos } from '../../api/api';

type Props = {
  selectedUserId: number;
  changeUser(id: number): void;
};

type State = {
  todos: Todo[];
  searchQuery: string;
  settingsOfVisibility: string;
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    todos: [],
    searchQuery: '',
    settingsOfVisibility: '',
  };

  componentDidMount() {
    getTodos().then(todos => this.setState({ todos }));
  }

  render() {
    const { todos, searchQuery, settingsOfVisibility } = this.state;
    const visibleList = todos
      .filter(todo => {
        if (!todo.title.toLowerCase().includes(searchQuery.toLowerCase())) {
          return false;
        }

        if (settingsOfVisibility === 'active' && todo.completed) {
          return false;
        }

        if (settingsOfVisibility === 'completed' && !todo.completed) {
          return false;
        }

        return true;
      });

    return (
      <div className="TodoList">
        <input
          placeholder="Search"
          value={searchQuery}
          onChange={event => this.setState({ searchQuery: event.target.value })}
        />
        <select
          onChange={event => this.setState({ settingsOfVisibility: event.target.value })}
        >
          <option value="all">
            All
          </option>
          <option value="active">
            Active
          </option>
          <option value="completed">
            Completed
          </option>
        </select>
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {visibleList.map(todo => (
              <li
                key={todo.id}
                className={classNames(
                  {
                    TodoList__item: true,
                    'TodoList__item--unchecked': !todo.completed,
                    'TodoList__item--checked': todo.completed,
                  },
                )}
              >
                <label htmlFor="input">
                  <input
                    name="input"
                    type="checkbox"
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classNames(
                    'TodoList__user-button',
                    'button',
                    { 'TodoList__user-button--selected': this.props.selectedUserId === todo.userId },
                  )}
                  type="button"
                  onClick={() => this.props.changeUser(todo.userId)}
                >
                  {`User: #${todo.userId}`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
