import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import { getTodos } from '../../api';

type Props = {
  changeUser(userId: number): void;
};

type State = {
  query: string;
  todos: Todo[];
  filterTodosBy: string;
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    query: '',
    todos: [],
    filterTodosBy: '',
  };

  componentDidMount() {
    getTodos()
      .then(todos => {
        this.setState({ todos });
      });
  }

  getFilteredTodos = () => {
    let filteredTodos = this.state.todos
      .filter(todo => todo.title.toLowerCase().includes(this.state.query.toLowerCase()));

    if (this.state.filterTodosBy === 'completed') {
      filteredTodos = filteredTodos.filter(todo => todo.completed === true);
    }

    if (this.state.filterTodosBy === 'not completed') {
      filteredTodos = filteredTodos.filter(todo => todo.completed === false);
    }

    return filteredTodos;
  };

  render() {
    const { changeUser } = this.props;
    const { query } = this.state;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">

          <input
            className="TodoList__input input is-info"
            type="text"
            placeholder="Filter todos"
            value={query}
            onChange={(event) => (
              this.setState({ query: event.target.value })
            )}
          />

          <select
            className="TodoList__select select"
            name="filter"
            id="filter"
            onChange={(event) => (
              this.setState({ filterTodosBy: event.target.value })
            )}
          >
            <option value="all">
              Show all todos
            </option>
            <option value="completed">
              Show completed todos
            </option>
            <option value="not completed">
              Show active todos
            </option>
          </select>

          <ul className="TodoList__list">
            {this.getFilteredTodos().map(todo => (
              <li
                key={todo.id}
                className={classNames(
                  'TodoList__item',
                  { 'TodoList__item--checked': todo.completed },
                  { 'TodoList__item--unchecked': !todo.completed },
                )}
              >
                <label
                  htmlFor="user-button"
                >
                  <input
                    type="checkbox"
                    readOnly
                    checked={todo.completed}
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className="
                    TodoList__user-button
                    TodoList__user-button--selected
                    button
                  "
                  type="button"
                  name="user-button"
                  onClick={() => (
                    changeUser(todo.userId)
                  )}
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
