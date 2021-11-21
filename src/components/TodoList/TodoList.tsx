import React from 'react';
import { API } from '../../utils/api';
import './TodoList.scss';
import { TodoListItem } from './TodoListItem';

enum Status {
  all = 'All',
  completed = 'Completed',
  notCompleted = 'Not completed',
}

type Props = {
  setSelectedId: (userId: number) => void;
};

type State = {
  todos: Todo[];
  queryFieldSearch: string;
  status: Status;
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    todos: [],
    queryFieldSearch: '',
    status: Status.all,
  };

  componentDidMount() {
    API.getTodos()
      .then(todos => {
        this.setState({ todos });
      });
  }

  handleChange = (value: string, name: string) => {
    this.setState((state) => ({
      ...state,
      [name]: value,
    }));
  };

  filterTodos = (status = Status.all) => {
    const query = this.state.queryFieldSearch.toLowerCase();

    return this.state.todos.filter(todo => {
      const todoTitle = todo.title.toLowerCase();

      switch (status) {
        case Status.completed:
          return todoTitle.includes(query) && todo.completed;

        case Status.notCompleted:
          return todoTitle.includes(query) && !todo.completed;

        case Status.all:
        default:
          return todoTitle.includes(query);
      }
    });
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

          <button
            type="button"
            onClick={() => {
            }}
          >
            Randomize
          </button>
        </div>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {this.filterTodos(status).map(todo => (
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
