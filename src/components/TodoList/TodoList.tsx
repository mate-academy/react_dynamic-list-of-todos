import classNames from 'classnames';
import React from 'react';
import './TodoList.scss';
import { getTasks } from '../../api/api';

type Props = {
  selectedUserId: number;
  selectedId: (userId: number) => void;
};

type State = {
  userId: number;
  todos: Todo[] | [];
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
    const todos = await getTasks();

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
          case 'active':
            return !todo.completed;
          case 'completed':
            return todo.completed;
          case 'all':
            return todo;
          default:
            return 0;
        }
      });
    }

    return visibleTodos;
  };

  render() {
    const visibleTodos = this.prepareTodos();
    const { userId, query, filterBy } = this.state;
    const { selectedId: onSelectedId, selectedUserId } = this.props;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div className="TodoList__form">
          <input
            type="text"
            value={query}
            className="TodoList__item item"
            onChange={(event) => (
              this.handelChange(event)
            )}
            placeholder="Enter your task"
          />
          <select
            value={filterBy}
            className="TodoList__item"
            onChange={(event => (
              this.handelSelectChange(event)
            ))}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {visibleTodos.map(todo => (
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
