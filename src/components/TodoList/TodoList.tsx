import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import { getTodos } from '../../api/api';

type Props = {
  selectedUserId: number;
  selectUser(userId: number): void;
};

type State = {
  todos: Todo[];
  query: string;
  visibilitySetting: string;
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    todos: [],
    query: '',
    visibilitySetting: 'all',
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({ todos });
  }

  render() {
    const { query, todos, visibilitySetting } = this.state;
    const visibleList = todos.filter(todo => {
      if (!todo.title.includes(query)) {
        return false;
      }

      if (visibilitySetting === 'active' && todo.completed) {
        return false;
      }

      return !(visibilitySetting === 'completed' && !todo.completed);
    });

    return (
      <div className="TodoList">
        <div className="TodoList__control">
          <input
            className="TodoList__input"
            type="text"
            placeholder="Search"
            value={this.state.query}
            onChange={event => this.setState({ query: event.target.value })}
          />
          <select
            className="TodoList__select"
            onChange={event => this.setState({ visibilitySetting: event.target.value })}
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
        </div>
        <h2>Todos:</h2>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {visibleList.map(todo => (
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
                <label htmlFor="input">
                  <input
                    name="input"
                    type="checkbox"
                    readOnly
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classNames({
                    'TodoList__user-button': true,
                    'TodoList__user-button--selected': this.props.selectedUserId === todo.userId,
                    button: true,
                  })}
                  type="button"
                  onClick={() => this.props.selectUser(todo.userId)}
                >
                  {`User#${todo.userId.toString()}`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
