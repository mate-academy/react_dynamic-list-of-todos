import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  selectUser: (id: number) => void;
  selectedUserId: number;
};

type State = {
  search: string;
  filterBy: string;
};

export class TodoList extends React.Component<Props, State> {
  state = {
    search: '',
    filterBy: 'all',
  };

  getfilteredTodos = () => {
    const { todos } = this.props;
    const { filterBy, search } = this.state;

    const filterByStatus = todos.filter(({ completed }) => {
      switch (filterBy) {
        case 'active':
          return !completed;
        case 'completed':
          return completed;
        default:
          return true;
      }
    });

    const filtered = filterByStatus.filter(({ title }) => {
      return title.toLowerCase().includes(search.toLowerCase());
    });

    return filtered;
  };

  render() {
    const result = this.getfilteredTodos();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div>
          <span>
            Search:
          </span>
          <div>
            <input
              type="text"
              placeholder="Title"
              value={this.state.search}
              onChange={event => this.setState({ search: event.target.value })}
            />

            <select onChange={event => this.setState({ filterBy: event.target.value })}>
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {result.map(todo => (
              <li
                key={todo.id}
                className={
                  classNames('TodoList__item', {
                    'TodoList__item--checked': todo.completed,
                    'TodoList__item--unchecked': !todo.completed,
                  })
                }
              >
                <label htmlFor="forSmthng">
                  <input
                    type="checkbox"
                    readOnly
                    checked={todo.completed}
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={
                    classNames('TodoList__user-button',
                      'button', {
                        'TodoList__user-button--selected':
                          this.props.selectedUserId === todo.userId,
                      })
                  }
                  type="button"
                  onClick={() => this.props.selectUser(todo.userId)}
                >
                  User
                  {' '}
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
