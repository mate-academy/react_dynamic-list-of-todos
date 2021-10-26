import React from 'react';
import classnames from 'classnames';
import { getTodos } from '../../Api/api';
import './TodoList.scss';

interface Todo{
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

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
    const { selectedUserId, selectUser } = this.props;
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
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
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
                  className={classnames('TodoList__item', `TodoList__item--${
                    completed ? 'checked' : 'unchecked'
                  }`)}
                  key={id}
                >
                  <label htmlFor={title}>
                    <input type="checkbox" id={title} readOnly checked={completed} />
                    <p>{title}</p>
                  </label>
                  <button
                    className={classnames('TodoList__user-button', 'button',
                      `TodoList__user-button--${selectedUserId === userId ? 'selected' : 'unselected'
                      }`)}
                    type="button"
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
