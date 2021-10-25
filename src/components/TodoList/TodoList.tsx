import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types';
import './TodoList.scss';

type Props = {
  selectUser: (userId: number) => void;
  selectedUserId: number,
  todos: Todo[];
};

type State = {
  searched: string;
  selected: string;
};

export class TodoList extends React.Component<Props, State> {
  state = {
    searched: '',
    selected: '',
  };

  render() {
    const { selectUser, todos, selectedUserId } = this.props;
    const { searched, selected } = this.state;

    let filteredTodos = todos.filter(todo => todo.title.includes(searched));

    switch (selected) {
      case 'active':
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;

      case 'completed':
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;

      default:
        break;
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <input
          className="TodoList__searchbar"
          type="text"
          placeholder="enter task name"
          value={searched}
          onChange={event => {
            this.setState({ searched: event.target.value });
          }}
        />

        <select
          className="TodoList__select"
          onChange={event => {
            this.setState({ selected: event.target.value });
          }}
        >
          <option value="all">all</option>
          <option value="active">active</option>
          <option value="completed">completed</option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <li
                className={classNames(
                  'TodoList__item',
                  { 'TodoList__item--unchecked': !todo.completed },
                  { 'TodoList__item--checked': todo.completed },
                )}
              >
                <label htmlFor={`${todo.id}`}>
                  <input
                    type="checkbox"
                    readOnly
                    checked={todo.completed}
                  />
                  <p id={`${todo.id}`}>{todo.title}</p>
                </label>

                <button
                  className={classNames(
                    'TodoList__user-button',
                    'button',
                    { 'TodoList__user-button--selected': selectedUserId === todo.userId },
                  )}
                  type="button"
                  onClick={() => selectUser(todo.userId)}
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
