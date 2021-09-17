import React from 'react';
import on from 'classnames';
import './TodoList.scss';

enum FilterByStatusTypes {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

interface State {
  todos: Todo[];
  searchQuery: string;
  filterByStatus: FilterByStatusTypes;
}

interface Props {
  onUserSelection: (userId: number) => void,
  todos: Todo[]
  selectedUserId: number;
}

export class TodoList extends React.Component<Props, State> {
  state: State = {
    todos: [],
    searchQuery: '',
    filterByStatus: 'all' as FilterByStatusTypes,
  };

  handleSearch = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: target.value });
  };

  handleSelect = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ filterByStatus: target.value as FilterByStatusTypes });
  };

  randomize = () => {
    this.setState(prevState => ({
      todos: [...prevState.todos].sort(() => Math.random() - 0.5),
    }));
  };

  getFilteredTodos = () => {
    const { searchQuery, filterByStatus } = this.state;
    const { todos } = this.props;
    const queryLow = searchQuery.toLowerCase();

    const filteredTodos = todos.filter(todo => {
      switch (filterByStatus) {
        case FilterByStatusTypes.active:
          return !todo.completed;

        case FilterByStatusTypes.completed:
          return todo.completed;

        case FilterByStatusTypes.all:
        default:
          return todo;
      }
    });

    return filteredTodos.filter(todo => (
      todo.title
      && todo.title.toLowerCase().includes(queryLow)
    ));
  };

  render() {
    const {
      searchQuery,
      filterByStatus,
    } = this.state;
    const { onUserSelection, selectedUserId } = this.props;
    const filteredTodos = this.getFilteredTodos();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <input
            value={searchQuery}
            type="text"
            placeholder="Search by title"
            onChange={this.handleSearch}
          />
          <label htmlFor="status-type">
            Status:
            <select
              onChange={this.handleSelect}
              value={filterByStatus}
              id="status-type"
              className="TodoList__controls--status"
            >
              <option value="all">
                All
              </option>
              <option value="active">
                Active
              </option>
              <option value="completed">
                Completed
              </option>
            </select>
          </label>
          <ul className="TodoList__list">
            {filteredTodos.map((todo) => (
              <li
                key={todo.id}
                className={on(
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
                  className={on(git checkout -b develop
                    'TodoList__user-button button',
                    { 'TodoList__user-button--selected': todo.userId === selectedUserId },
                  )}
                  type="button"
                  onClick={() => {
                    onUserSelection(todo.userId);
                  }}
                >
                  User&nbsp;
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
