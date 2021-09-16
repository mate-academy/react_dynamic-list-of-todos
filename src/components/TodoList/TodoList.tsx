import React from 'react';
import classNames from 'classnames';
import { getTodos } from '../../api/api';
import './TodoList.scss';

type Props = {
  selectedUserId: number;
  onSelectedId: (userId: number) => void;
};
type State = {
  userId: number;
  todos: [] | Todo[];
  query: string;
  filterBy: string;
};
export class TodoList extends React.Component<Props, State> {
  state: State = {
    userId: 0,
    todos: [],
    query: '',
    filterBy: '',
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({ todos });
  }

  handelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  handelSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ filterBy: event.target.value });
  };

  prepareTodos = () => {
    const { todos, query, filterBy } = this.state;
    let visibleTodos = todos.filter(todo => (
      todo.title.toLowerCase().includes(query.toLowerCase())
    ));

    if (filterBy) {
      visibleTodos = visibleTodos.filter(todo => {
        switch (filterBy) {
          case 'all':
            return todo;
          case 'active':
            return !todo.completed;
          case 'completed':
            return todo.completed;
          default:
            return 0;
        }
      });
    }

    return visibleTodos;
  };

  render() {
    const { userId, query, filterBy } = this.state;
    const { onSelectedId, selectedUserId } = this.props;
    const visibleTodos = this.prepareTodos();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <input
          type="text"
          value={query}
          onChange={(event) => (
            this.handelChange(event)
          )}
          placeholder="Find your task"
        />
        <select
          className="form-select mb-3 mt-3"
          value={filterBy}
          onChange={(event => (
            this.handelSelectChange(event)
          ))}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {visibleTodos.map(todo => (
              <li
                className={classNames(
                  'TodoList__item',
                  {
                    'TodoList__item--unchecked': !todo.completed,
                    'TodoList__item--checked': todo.completed,
                  },
                )}
                key={todo.id}
              >
                <label>
                  <input
                    className="form-control"
                    type="checkbox"
                    readOnly
                    checked={todo.completed}
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classNames(
                    'TodoList__user-button button',
                    {
                      'TodoList__user-button--selected button': todo.userId === selectedUserId,
                    },
                  )}
                  type="button"
                  value={userId}
                  onClick={() => (
                    onSelectedId(todo.userId)
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
