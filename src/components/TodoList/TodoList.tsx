import React from 'react';
import classnames from 'classnames';
import { getTodos } from '../../api/api';
import { Todo } from '../../react-app-env';
import './TodoList.scss';

type Props = {
  selectedUserId: number,
  selectUser(userId: number): void,
};

type State = {
  todos: Todo[],
  query: string,
  showTodosValue: string,
};

export class TodoList extends React.Component <Props, State> {
  state: State = {
    todos: [],
    query: '',
    showTodosValue: 'all',
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({ todos });
  }

  render() {
    const { selectUser, selectedUserId } = this.props;
    const { query, todos, showTodosValue } = this.state;
    const visibleTodos = todos.filter(todo => {
      if (!todo.title.toLowerCase().includes(query.toLowerCase())) {
        return false;
      }

      if (showTodosValue === 'active' && todo.completed) {
        return false;
      }

      return !(showTodosValue === 'completed' && !todo.completed);
    });

    return (
      <div className="TodoList">
        <h2 className="TodoList__header">
          Todos:
        </h2>

        <div className="TodoList__container">
          <input
            type="text"
            value={this.state.query}
            onChange={event => this.setState({ query: event.target.value })}
          />
          <select
            onChange={event => this.setState({ showTodosValue: event.target.value })}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>

          <ul className="TodoList__list">
            {visibleTodos.map(todo => {
              const {
                id, title, userId, completed,
              } = todo;

              return (
                <li
                  key={id}
                  className={classnames('TodoList__item', `TodoList__item--${
                    completed ? 'checked' : 'unchecked'
                  }`)}
                >
                  <label htmlFor={title}>
                    <input type="checkbox" id={title} readOnly checked={completed} />
                    <p>{title}</p>
                  </label>
                  <button
                    type="button"
                    className={classnames('TodoList__user-button', 'button',
                      `TodoList__user-button--${selectedUserId === userId ? 'selected' : 'unselected'
                      }`)}
                    onClick={() => selectUser(todo.userId)}
                  >
                    {`User#${userId}`}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
