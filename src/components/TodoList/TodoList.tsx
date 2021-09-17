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

type Event = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>;

export class TodoList extends React.Component<Props, State> {
  state: State = {
    visibleTodos: this.props.todos,
    filterBy: FilterByStatus.All,
    titleFilter: '',
  };

  filterOptions = [
    FilterByStatus.All,
    FilterByStatus.Active,
    FilterByStatus.Completed,
  ];

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

  shuffleTodos = async () => {
    this.setState(state => (
      {
        visibleTodos: state.visibleTodos.sort(() => Math.random() - 0.5),
      }
    ));
  };

  handleChange = async (event: Event) => {
    const { name, value } = event.target;

    if (name === 'filterBy') {
      await this.setState({
        filterBy: value as FilterByStatus,
      });
    } else {
      await this.setState({
        titleFilter: value,
      });
    }

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
          onChange={this.handleChange}
          className="TodoList__input"
        />

        <select
          name="filterBy"
          value={filterBy}
          onChange={this.handleChange}
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

        <button
          type="button"
          onClick={this.shuffleTodos}
          className="TodoList__button button"
        >
          Randomize
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
