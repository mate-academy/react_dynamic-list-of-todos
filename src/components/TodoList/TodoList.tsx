import React from 'react';
import './TodoList.scss';
import { TodoListItem } from './TodoListItem';

enum Status {
  all = 'All',
  completed = 'Completed',
  notCompleted = 'Not completed',
}

type Props = {
  todos: Todo[];
  setSelectedId: (userId: number) => void;
};

type State = {
  queryFieldSearch: string;
  status: Status;
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    queryFieldSearch: '',
    status: Status.all,
  };

  componentDidUpdate(_prevProps: Props, prevState: State) {
    if (prevState.status !== this.state.status) {
      this.filterShowStatus(this.state.status);
    }
  }

  handleChange = (value: string, name: string) => {
    this.setState((state) => ({
      ...state,
      [name]: value,
    }));
  };

  filterTodos = () => {
    const query = this.state.queryFieldSearch.toLowerCase();

    return this.props.todos.filter(todo => {
      return todo.title.toLowerCase().includes(query);
    });
  };

  filterShowStatus = (status = '') => {
    switch (status) {
      case Status.completed:
        return this.filterTodos().filter(todo => todo.completed);

      case Status.notCompleted:
        return this.filterTodos().filter(todo => !todo.completed);

      case Status.all:
      default:
        return this.filterTodos();
    }
  };

  render() {
    const { setSelectedId } = this.props;
    const { queryFieldSearch, status } = this.state;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__header">
          <input
            name="queryFieldSearch"
            placeholder="filter"
            className="input"
            value={queryFieldSearch}
            onChange={(e) => {
              this.handleChange(e.target.value, e.target.name);
              this.filterTodos();
            }}
          />

          <select
            className="select"
            name="status"
            value={status}
            onChange={(e) => {
              this.handleChange(e.target.value, e.target.name);
            }}
          >
            {Object.entries(Status).map(valueStatus => (
              <option
                key={valueStatus[0]}
                value={valueStatus[1]}
              >
                {valueStatus[1]}
              </option>
            ))}
          </select>
        </div>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {this.filterShowStatus(status).map(todo => (
              <TodoListItem
                key={todo.id}
                todo={todo}
                setSelectedId={setSelectedId}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
