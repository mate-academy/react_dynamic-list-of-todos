import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

type Props = {
  selectUser: (userId: number) => void;
  todos: Todo[];
  onComplete: (id: number) => void;
  selectedUser: number;
};

type State = {
  query: string;
  filterByStatus: string;
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    query: '',
    filterByStatus: '',
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    this.setState({ [name]: value } as Pick<State, keyof State>);
  };

  filterTasks = (todos: Todo[]) => {
    const { query, filterByStatus } = this.state;

    let visibleTasks = [...todos].filter(todo => {
      if (todo.title) {
        return todo.title.toLowerCase().includes(query.toLowerCase());
      }

      return false;
    });

    if (filterByStatus === 'active') {
      visibleTasks = visibleTasks.filter(todo => !todo.completed);
    } else if (filterByStatus === 'completed') {
      visibleTasks = visibleTasks.filter(todo => todo.completed);
    }

    return visibleTasks;
  };

  render() {
    const {
      todos,
      onComplete,
      selectUser,
      selectedUser,
    } = this.props;
    const { query, filterByStatus } = this.state;
    const visibleTasks = this.filterTasks(todos);

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div className="form-field">
          <label htmlFor="query">
            Search todos:
          </label>
          <input
            name="query"
            id="query"
            value={query}
            onChange={this.handleChange}
          />

          <label htmlFor="filterByStatus">Show: </label>
          <select
            name="filterByStatus"
            id="filterByStatus"
            onChange={this.handleChange}
            value={filterByStatus}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {
              visibleTasks.map(todo => (
                <li
                  className={classNames('TodoList__item', {
                    'TodoList__item--unchecked': !todo.completed,
                    'TodoList__item--checked': todo.completed,
                  })}
                  key={todo.id}
                >
                  <label>
                    <input
                      type="checkbox"
                      readOnly
                      checked={todo.completed}
                      onChange={() => onComplete(todo.id)}
                    />
                    <p>{todo.title}</p>
                  </label>

                  <button
                    className={classNames('TodoList__user-button', 'button', {
                      'TodoList__user-button--selected': selectedUser === todo.userId,
                    })}
                    type="button"
                    onClick={() => {
                      selectUser(todo.userId);
                    }}
                  >
                    User&nbsp;#
                    {todo.userId}
                  </button>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}
