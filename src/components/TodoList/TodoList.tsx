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
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    todos: [],
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({ todos });
  }

  render() {
    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {this.state.todos.map(todo => (
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
