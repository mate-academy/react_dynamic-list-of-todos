import classNames from 'classnames';
import React from 'react';
import { loadTodos } from '../../api/api';
import './TodoList.scss';

type Props = {
  selectedUser:((userId: number) => void),
};

type State = {
  searchingText: string,
  todos: Todo[],
  filterByKey: string,
};

export class TodoList extends React.Component<Props, State> {
  state:State = {
    searchingText: '',
    todos: [],
    filterByKey: 'all',
  };

  async componentDidMount() {
    const data = await loadTodos();

    this.setState({
      todos: [...data],
    });
  }

  hundleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchingText: event.target.value,
    });
  };

  hundleChangeTypeOfFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();

    this.setState({ filterByKey: event.target.value });
  };

  filterCompletedTasks = (todos: Todo[]) => (
    todos.filter(todo => {
      switch (this.state.filterByKey) {
        case 'active':
          return todo.completed === false;
        case 'completed':
          return todo.completed === true;
        case 'all':
        default:
          return todo;
      }
    })
  );

  searchTodo = () => {
    const { searchingText, todos } = this.state;
    const textToLowerCase = searchingText.toLowerCase();

    const filtredTodos = this.filterCompletedTasks(todos);

    return (
      filtredTodos.filter(todo => {
        return (todo.title.toLowerCase().includes(textToLowerCase));
      })
    );
  };

  render() {
    const { selectedUser } = this.props;
    const { searchingText, filterByKey } = this.state;

    const filteredTodo = this.searchTodo();

    return (
      <div className="TodoList">

        <div className="TodoList__searchContainer">
          <input
            type="text"
            className="TodoList__search"
            value={searchingText}
            onChange={this.hundleChange}
            placeholder="Search by title"
          />

          <div className="TodoList__select">
            <p>Completed</p>
            <select
              value={filterByKey}
              onChange={this.hundleChangeTypeOfFilter}
            >
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
        </div>

        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodo.map(todo => (
              <li
                key={todo.id}
                className={classNames(
                  'TodoList__item',
                  {
                    'TodoList__item--unchecked': !todo.completed,
                    'TodoList__item--checked': todo.completed,
                  },
                )}

              >
                <label>
                  <input
                    type="checkbox"
                    readOnly
                    checked={todo.completed}
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className="
                TodoList__user-button
                TodoList__user-button--selected
                button
              "
                  type="button"
                  onClick={() => {
                    selectedUser(todo.userId);
                  }}
                >
                  User&nbsp;
                  {todo.userId}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
