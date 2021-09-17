import React from 'react';
import { TodoItems } from '../TodoItems';
import './TodoList.scss';

type Props = {
  todos: Todo[];
  selectedUser: number;
  onChangeUser: (id: number) => void;
};

type State = {
  visibleTodos: Todo[]
  filterBy: FilterByStatus;
  titleFilter: string;
};

enum FilterByStatus {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export class TodoList extends React.Component<Props, State> {
  state: State = {
    visibleTodos: this.props.todos,
    filterBy: FilterByStatus.All,
    titleFilter: '',
  };

  filterOptions = [FilterByStatus.All, FilterByStatus.Active, FilterByStatus.Completed];

  componentDidUpdate(prevProps: Props) {
    if (prevProps.todos !== this.props.todos) {
      this.loadTodos();
    }
  }

  loadTodos = () => {
    this.setState({
      visibleTodos: this.props.todos,
    });
  };

  getFilterTodos = () => {
    const { filterBy, titleFilter } = this.state;
    const { todos } = this.props;

    switch (true) {
      case (filterBy === FilterByStatus.All):
        this.setState({
          visibleTodos: todos.filter(todo => (
            todo.title
              .toLowerCase()
              .includes(titleFilter.toLowerCase())
          )),
        });
        break;
      case (filterBy === FilterByStatus.Active):
        this.setState({
          visibleTodos: todos.filter(todo => (
            !todo.completed
            && todo.title
              .toLowerCase()
              .includes(titleFilter.toLowerCase())
          )),
        });
        break;
      case (filterBy === FilterByStatus.Completed):
        this.setState({
          visibleTodos: todos.filter(todo => (
            todo.completed
            && todo.title
              .toLowerCase()
              .includes(titleFilter.toLowerCase())
          )),
        });
        break;
      default:
        break;
    }
  };

  selectHandleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    await this.setState({
      filterBy: event.target.value as FilterByStatus,
    });
    this.getFilterTodos();
  };

  inputHandleChange = async (event : React.ChangeEvent<HTMLInputElement>) => {
    await this.setState({
      titleFilter: event.target.value,
    });
    this.getFilterTodos();
  };

  render() {
    const { selectedUser, onChangeUser } = this.props;
    const { visibleTodos, filterBy } = this.state;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <input
          placeholder="Search by title"
          name="titleFilter"
          type="text"
          onChange={this.inputHandleChange}
          className="TodoList__input"
        />

        <select
          name="filterBy"
          value={filterBy}
          onChange={this.selectHandleChange}
          className="TodoList__select"
        >
          {this.filterOptions.map(selectItem => (
            <option
              value={selectItem}
              key={selectItem}
            >
              {selectItem}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => onChangeUser(0)}
          className="TodoList__button button"
        >
          Clear selected user
        </button>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            <TodoItems
              selectedUser={selectedUser}
              onChangeUser={onChangeUser}
              visibleTodos={visibleTodos}
            />
          </ul>
        </div>
      </div>
    );
  }
}
