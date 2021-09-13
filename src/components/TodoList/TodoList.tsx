import React from 'react';
import classNames from 'classnames';
import { getTodos } from '../../api';
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
  hasLoadingError: boolean;
  isShuffled: boolean
}

interface Props {
  selectedUserId: number;
  onUserSelect: (userId: number) => void;
}

export class TodoList extends React.Component<Props, State> {
  state: State = {
    todos: [],
    searchQuery: '',
    filterByStatus: '' as FilterByStatusTypes,
    hasLoadingError: false,
    isShuffled: false,
  };

  async componentDidMount() {
    try {
      const todos = await getTodos();

      this.setState({ todos });
    } catch {
      this.setState({ hasLoadingError: true });
    }
  }

  handleSearch = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: target.value });
  };

  handleSelect = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ filterByStatus: target.value as FilterByStatusTypes });
  };

  randomise = (todos: Todo[]) => {
    return [...todos].sort(() => Math.random() - 0.5);
  };

  getFilteredTodos = () => {
    const { searchQuery, todos, filterByStatus } = this.state;
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
      hasLoadingError,
      isShuffled,
    } = this.state;
    const { selectedUserId, onUserSelect } = this.props;
    let filteredTodos = this.getFilteredTodos();

    if (isShuffled) {
      filteredTodos = this.randomise(filteredTodos);
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__controls">
          <input
            value={searchQuery}
            type="text"
            placeholder="Search by title"
            onChange={this.handleSearch}
          />

          <button
            type="button"
            className="button"
            onClick={() => this.setState({ isShuffled: true })}
          >
            Randomise
          </button>

          <select
            onChange={this.handleSelect}
            value={filterByStatus}
          >
            <option value="" disabled>
              Choose status type
            </option>
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
        </div>

        <div className="TodoList__list-container">
          {filteredTodos.length > 0
            ? (
              <ul className="TodoList__list">
                {filteredTodos.map(todo => (
                  <li
                    key={todo.id}
                    className={
                      classNames('TodoList__item', {
                        'TodoList__item--checked': todo.completed,
                        'TodoList__item--unchecked': !todo.completed,
                      })
                    }
                  >
                    <label>
                      <input
                        type="checkbox"
                        checked={todo.completed}
                      />
                      <p>{todo.title}</p>
                    </label>

                    <button
                      type="button"
                      className={
                        classNames('button TodoList__user-button', {
                          'TodoList__user-button--selected': todo.userId === selectedUserId,
                        })
                      }
                      onClick={() => onUserSelect(todo.userId)}
                    >
                      {`User #${todo.userId}`}
                    </button>
                  </li>
                ))}
              </ul>
            )
            : <h2>Loading...</h2>}
          {hasLoadingError
            && <h2>Server is not responding</h2>}
        </div>
      </div>
    );
  }
}
