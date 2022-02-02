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
  prevStatus: string,
  prevTitle: string,
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
    prevStatus: '',
    prevTitle: '',
  };

  async componentDidMount() {
    this.setState({ todos: await getTodos() });
  }

  componentDidUpdate() {
    if (this.state.filterByStatus !== this.state.prevStatus
      || this.state.prevTitle !== this.state.titleFilter) {
      this.handleStatusFilter();
      // eslint-disable-next-line no-console
      console.log('test');
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

    this.setState(state => ({ prevStatus: state.filterByStatus, prevTitle: state.titleFilter }));

    if (this.state.filterByStatus === 'completed') {
      this.setState({
        todos: await getTodos().then(todos => todos
          .filter(todo => todo.completed === true && todo.title.includes(titleFilter))),
      });
    } else if (this.state.filterByStatus === 'not completed') {
      this.setState({
        todos: await getTodos().then(todos => todos
          .filter(todo => todo.completed === false && todo.title.includes(titleFilter))),
      });
    } else if (this.state.filterByStatus === 'all') {
      this.setState({
        todos: await getTodos().then(todos => todos
          .filter(todo => todo.title.includes(titleFilter))),
      });
    }
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
