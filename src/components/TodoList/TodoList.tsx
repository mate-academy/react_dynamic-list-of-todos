import React from 'react';
import { getTodos } from '../../api/api';
import './TodoList.scss';

interface Props {
  onSelectUser: (userId: number) => void;
  selectedUserId: number;
}

interface State {
  todos: Todo[];
  isLoadingError: boolean;
  filterByState: string;
  filterByQuery: string;
}

export class TodoList extends React.Component<Props, State> {
  state: State = {
    todos: [],
    isLoadingError: true,
    filterByState: 'All',
    filterByQuery: '',
  };

  componentDidMount() {
    try {
      getTodos()
        .then(todos => {
          this.setState({ todos, isLoadingError: false });
        });
    } catch {
      this.setState({ isLoadingError: true });
    }
  }

  handleSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const { value } = event.target;

    this.setState({
      filterByState: value,
    });
  };

  handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;

    this.setState({
      filterByQuery: value,
    });
  };

  setRandomSort = () => {
    this.setState((prevState) => ({
      todos: prevState.todos.sort(() => 0.5 - Math.random()),
    }));
  };

  getPrepearedList = () => {
    const { todos, filterByQuery, filterByState } = this.state;

    let prepearedList: Todo[] = todos.filter(todo => {
      switch (filterByState) {
        case 'Active':
          return !todo.completed;
        case 'Completed':
          return todo.completed;
        case 'All':
        default:
          return todo;
      }
    });

    prepearedList = prepearedList
      .filter(todo => (todo.title
        && todo.title.toLocaleLowerCase().includes(filterByQuery.toLocaleLowerCase())));

    return prepearedList;
  };

  render() {
    const {
      isLoadingError,
      filterByState,
      filterByQuery,
    } = this.state;
    const { onSelectUser, selectedUserId } = this.props;
    const prepearedTodos = this.getPrepearedList();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div className="input-group mb-2">
          <select className="form-select" value={filterByState} onChange={this.handleSelect}>
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
          <input className="form-control" value={filterByQuery} onChange={this.handleInput} placeholder="search..." />
          <button type="button" className="btn btn-primary" onClick={this.setRandomSort}>
            Randomize
          </button>
        </div>
        <div className={`TodoList__list-container ${isLoadingError && ('spinner-border')}`}>
          {!isLoadingError && (
            <ul className="TodoList__list">
              {prepearedTodos.map(todo => (
                <li
                  key={todo.id}
                  className={
                    todo.completed ? 'TodoList__item TodoList__item--checked' : 'TodoList__item TodoList__item--unchecked'
                  }
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
                    type="button"
                    className={selectedUserId !== todo.userId
                      ? 'Todolist__user-button button '
                      : 'TodoList__user-button TodoList__user-button--selected button'}
                    onClick={() => onSelectUser(todo.userId)}
                  >
                    {`User #${todo.userId}`}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}
