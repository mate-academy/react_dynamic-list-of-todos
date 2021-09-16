import React from 'react';
import classNames from 'classnames';

import './TodoList.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Props {
  todos: Todo[];
  handleUserSelection: (selectedUserId: number) => void;
}

interface State {
  query: string;
  filter: string;
}

export class TodoList extends React.Component<Props, State> {
  state: State = {
    query: '',
    filter: 'All',
  };

  handleQuery = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: target.value });
  };

  handleFilter = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ filter: target.value });
  };

  getFilteredTodos = () => {
    const { todos } = this.props;
    const { query, filter } = this.state;

    let filteredTodos = todos.filter(todo => (todo.title
      && todo.title.toLowerCase()
        .includes(query.toLowerCase())
    ));

    filteredTodos = filteredTodos.filter(todo => {
      switch (filter) {
        case 'Active':
          return todo.completed === false;
        case 'Completed':
          return todo.completed === true;
        case 'All':
        default:
          return todos;
      }
    });

    return filteredTodos;
  };

  render() {
    const { query, filter } = this.state;
    const { handleUserSelection } = this.props;
    const filteredTodos = this.getFilteredTodos();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div className="TodoList__form">
          <input
            type="text"
            name="query"
            value={query}
            className="TodoList__item"
            onChange={(this.handleQuery)}
          />

          <select
            name="filter"
            className="TodoList__item"
            value={filter}
            onChange={this.handleFilter}
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map((todo) => (
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
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    readOnly
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
                  onClick={() => handleUserSelection(todo.userId)}
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
