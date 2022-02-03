import React from 'react';
import './TodoList.scss';
import { getTodos } from '../../api/api';

enum Status {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

type Props = {
  selectedUserId: number;
  selectUser: (userId: number) => void;
};

type State = {
  todos: Todo[];
  status: Status;
  query: string;
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    todos: [],
    status: 'all' as Status,
    query: '',
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({ todos });
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ status: event.target.value as Status });
  };

  randomSort = () => {
    this.setState((prevState) => ({
      todos: prevState.todos.sort(() => Math.random() - 0.5),
    }));
  };

  filterTodos = () => {
    const { todos, status, query } = this.state;
    const filteredTodos = todos.filter(todo => {
      switch (status) {
        case Status.active:
          return !todo.completed;
        case Status.completed:
          return todo.completed;
        default:
          return todo;
      }
    });

    return filteredTodos.filter(todo => (
      todo.title
      && todo.title.toLowerCase().includes(query.toLowerCase())));
  };

  render() {
    const {
      status,
      query,
    } = this.state;
    const { selectedUserId, selectUser } = this.props;
    const filteredTodos = this.filterTodos();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__sort">
          <input
            className="TodoList__item"
            value={query}
            type="text"
            placeholder="Search by title"
            onChange={this.handleChange}
          />

          <select
            className="TodoList__item"
            onChange={this.handleSelect}
            value={status}
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

          <button
            className="button"
            type="button"
            onClick={this.randomSort}
          >
            Randomise
          </button>
        </div>

        <div className="TodoList__list-container">
          {filteredTodos.length > 0
            && (
              <ul className="TodoList__list">
                {filteredTodos.map(todo => (
                  <li
                    key={todo.id}
                    className={
                      todo.completed
                        ? 'TodoList__item TodoList__item--checked' : 'TodoList__item TodoList__item--unchecked'
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
                      className={selectedUserId === todo.userId
                        ? 'button TodoList__user-button--selected' : 'button'}
                      onClick={() => selectUser(todo.userId)}
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
