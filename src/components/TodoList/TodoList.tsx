/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import React from 'react';
import './TodoList.scss';
import { getTodosByStatus } from '../../api/api';

type Props = {
  setSelectedUserId: (userId: number) => void,
};

type State = {
  todos: Todo[],
  status: string,
  query: string,
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    todos: [],
    status: 'all',
    query: '',
  };

  componentDidMount() {
    this.loadTodosByStatus();
  }

  componentDidUpdate(_: {}, prevState: State) {
    if (this.state.status !== prevState.status) {
      this.loadTodosByStatus();
    }
  }

  setStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ status: event.target.value });
  };

  setQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  getTodosByQuery = () => {
    const { todos, query } = this.state;
    const queryLoverCase = query.toLowerCase();

    return todos.filter(todo => (
      todo.title.toLowerCase().includes(queryLoverCase)));
  };

  async loadTodosByStatus() {
    const { status } = this.state;
    const todos = await getTodosByStatus(status);

    this.setState({ todos });
  }

  render() {
    const { query, status } = this.state;
    const visibleTodos = this.getTodosByQuery();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <form className="ui form">
          <div className="two fields">
            <div className="field">
              <label>Type search word</label>
              <input
                type="text"
                id="search-query"
                placeholder="Type search word"
                value={query}
                onChange={this.setQuery}
              />
            </div>
            <div className="field">
              <label>Choose status</label>
              <select
                className="ui fluid dropdown"
                value={status}
                onChange={this.setStatus}
              >
                <option value="all"> All </option>
                <option value="false"> Active </option>
                <option value="true"> Completed </option>
              </select>
            </div>
          </div>
        </form>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {visibleTodos.map(todo => (
              <li
                className={classNames({
                  TodoList__item: true,
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': todo.completed,
                })}
                key={todo.id}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classNames({
                    button: true,
                    'TodoList__user-button': true,
                    'TodoList__user-button--selected': todo.completed,
                  })}
                  type="button"
                  onClick={() => this.props.setSelectedUserId(todo.userId)}
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
