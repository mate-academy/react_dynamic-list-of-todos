import React from 'react';
import classNames from 'classnames';
import { loadTodos } from '../../api/api';
import './TodoList.scss';

type Props = {
  selectedUserId: number,
  selectUser: (userId: number) => void,
};

type State = {
  todos: Todo[],
  query: string,
  filterBy: string,
};

export class TodoList extends React.Component <Props, State> {
  state: State = {
    todos: [],
    query: '',
    filterBy: '',
  };

  async componentDidMount() {
    const todos = await loadTodos();

    this.setState({ todos });
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  hanldeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ filterBy: event.target.value });
  };

  getPreparedTodos = () => {
    const { todos, query, filterBy } = this.state;

    let preparedTodos = todos.filter(todo => (
      todo.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    ));

    preparedTodos = preparedTodos.filter(todo => {
      switch (filterBy) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        case 'all':
        default:
          return todo;
      }
    });

    return preparedTodos;
  };

  render() {
    const { query, filterBy } = this.state;
    const { selectedUserId, selectUser } = this.props;
    const visibleTodos = this.getPreparedTodos();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div className="TodoList__filter">
          <div>
            <input
              type="text"
              placeholder="Search"
              value={query}
              onChange={this.handleChange}
            />
            <select
              value={filterBy}
              onChange={this.hanldeSelect}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {visibleTodos.map((todo) => (
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
                <input
                  type="checkbox"
                  checked={todo.completed}
                  readOnly
                />
                <p>{todo.title}</p>
                <button
                  type="button"
                  className={classNames(
                    'TodoList__user-button',
                    {
                      'TodoList__user-button--selected': todo.userId === selectedUserId,
                    },
                  )}
                  onClick={() => {
                    selectUser(todo.userId);
                  }}
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
