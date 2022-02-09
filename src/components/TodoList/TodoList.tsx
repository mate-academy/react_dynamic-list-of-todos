import React from 'react';
import './TodoList.scss';
import { getTodos } from '../../api/api';

type Props = {
  selectedUserId: number,
  onUserChange: (userId: number) => void,
};
type State = {
  todos: Todo[],
  filterByStatus: string,
  titleFilter: string,
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    todos: [{
      id: 0,
      createdAt: '',
      updatedAt: '',
      userId: 0,
      title: '',
      completed: false,
    }],
    filterByStatus: 'all',
    titleFilter: '',
  };

  async componentDidMount() {
    this.setState({ todos: await getTodos() });
  }

  componentDidUpdate(_prevProps: Props, prevState: State) {
    if (this.state.filterByStatus !== prevState.filterByStatus
      || prevState.titleFilter !== this.state.titleFilter) {
      this.handleStatusFilter();
    }
  }

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ titleFilter: event.target.value });
  };

  handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ filterByStatus: event.target.value });
  };

  handleStatusFilter = async () => {
    const { titleFilter } = this.state;

    let serverTodos = await getTodos().then(todos => todos
      .filter(todo => todo.title.includes(titleFilter)));

    switch (this.state.filterByStatus) {
      case 'completed':
        serverTodos = serverTodos.filter(todo => todo.completed === true);
        break;
      case 'not completed':
        serverTodos = serverTodos.filter(todo => todo.completed === false);
        break;
      default:
    }

    this.setState({
      todos: serverTodos,
    });
  };

  render() {
    return (
      <div className="TodoList">
        <input
          type="text"
          placeholder="Title"
          className="TodoList__filter"
          value={this.state.titleFilter}
          onChange={this.handleTitleChange}
        />
        <select
          value={this.state.filterByStatus}
          onChange={this.handleSelectChange}
        >
          <option value="all">Show all</option>
          <option value="completed">Show completed</option>
          <option value="not completed">Show not completed</option>
        </select>
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {this.state.todos?.map(todo => (
              <li
                className={`TodoList__item TodoList__item--${todo.completed ? 'checked' : 'unchecked'}`}
                key={todo.id}
              >
                <label htmlFor={`${todo.id}`}>
                  <input type="checkbox" id={`${todo.id}`} checked={todo.completed} readOnly />
                  <p>{todo.title}</p>
                </label>

                <button
                  onClick={() => {
                    this.props.onUserChange(todo.userId);
                  }}
                  className={`
                    TodoList__user-button
                    ${todo.userId === this.props.selectedUserId ? 'TodoList__user-button--selected' : ''}
                    button
                  `}
                  type="button"
                >
                  {`User ${todo.userId}`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
