import React from 'react';
import './TodoList.scss';
import { getTodos } from '../../api';

type State = {
  currentTodos: Todo[];
  query: string;
  status: Status | string;
};

type Props = {
  selectUser: (userId: number) => void;
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    currentTodos: [],
    query: '',
    status: '',
  };

  componentDidMount() {
    getTodos()
      .then((todos: Todo[]) => {
        this.setState({
          currentTodos: todos,
        });
      });
  }

  handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ status: event.target.value });
  };

  filterTodos = () => {
    let todos = [...this.state.currentTodos];

    todos = todos.filter(todo => todo.title.toLowerCase().includes(this.state.query.toLowerCase()));

    if (this.state.status === 'Active') {
      return todos.filter(arr => arr.completed === true);
    }

    if (this.state.status === 'Completed') {
      return todos.filter(arr => arr.completed === false);
    }

    return todos;
  };

  render() {
    const filteredTodos = this.filterTodos();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div className="TodoList__list-container">
          <input
            type="text"
            value={this.state.query}
            placeholder="Search.."
            className="input input-group"
            onChange={(event) => {
              this.setState({
                query: event.target.value,
              });
            }}
          />
          <select className="select form-select" onChange={this.handleChange}>
            <option value="" disabled selected hidden>Choose status</option>
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              todo.completed
                ? (
                  <li className="TodoList__item TodoList__item--unchecked">
                    <label>
                      <input type="checkbox" readOnly />
                      <p>{todo.title}</p>
                    </label>

                    <button
                      className="
                        TodoList__user-button
                        TodoList__user-button--selected
                        button
                      "
                      type="button"
                      onClick={() => this.props.selectUser(todo.userId)}
                    >
                      User&nbsp;
                      {todo.userId}
                    </button>
                  </li>
                )

                : (
                  <li className="TodoList__item TodoList__item--checked">
                    <label>
                      <input type="checkbox" checked readOnly />
                      <p>{todo.title}</p>
                    </label>

                    <button
                      className="TodoList__user-button button"
                      type="button"
                      onClick={() => this.props.selectUser(todo.userId)}
                    >
                      User&nbsp;
                      {todo.userId}
                    </button>
                  </li>
                )
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
