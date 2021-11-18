import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import { Todo } from '../../react-app-env';
import { requestTodoList } from '../../api';

type Props = {
  selectedUserId: number,
};

interface State {
  todos: Todo[],
}

export class TodoList extends React.Component<Props, State> {
  state:State = {
    todos: [],
  };

  async componentDidMount() {
    const loadedTodos = await requestTodoList();

    this.setState({
      todos: loadedTodos,
    });
  }

  render() {
    const { todos } = this.state;
    const { selectedUserId } = this.props;

    return (
      <div className="TodoList">
        <input
          type="text"
        />
        <select name="select">
          <option value="0">All</option>
          <option value="1">Completed</option>
          <option value="2">Active</option>
        </select>
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todos.map(todo => (
              <li
                key={todo.id}
                className={classNames(
                  'TodoList__item', {
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
                <p>
                  {todo.title}
                </p>
                <button
                  type="button"
                  className={classNames('TodoList__user-button button', {
                    'TodoList__item--checked': todo.userId === selectedUserId,
                  })}
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
