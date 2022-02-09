import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import { getAllTodos } from '../../api/api';

type Props = {
  selectUser: (id: number) => void;
};

type State = {
  todos: Todo[];
  query: string;
  filterBy: string;
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    todos: [],
    query: '',
    filterBy: 'all',
  };

  async componentDidMount() {
    const todos = await getAllTodos();

    this.setState({ todos });
  }

  handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      query: event.target.value.toLowerCase(),
    });
  };

  handleSelectorInput = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      filterBy: event.target.value,
    });
  };

  getFilteredTodos = () => (
    this.state.todos.filter(todo => todo.title.toLowerCase().includes(this.state.query))
  );

  render() {
    const { query, filterBy } = this.state;
    const { selectUser } = this.props;

    let visibleTodos = this.getFilteredTodos();

    visibleTodos = visibleTodos.filter(todo => {
      switch (filterBy) {
        case 'all':
          return todo;
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          return 0;
      }
    });

    return (
      <div className="TodoList">
        <h2 className="subtitle pb-2">Todos:</h2>
        <div className="control pb-2">
          <input
            type="text"
            id="search-query"
            className="input"
            placeholder="Search by title"
            value={query}
            onChange={this.handleSearch}
          />
        </div>

        <div className="select is-info">
          <select
            value={filterBy}
            onChange={this.handleSelectorInput}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="TodoList__list-container pt-2">
          <ul className="TodoList__list">
            {visibleTodos.map((todo) => (
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
                <input type="checkbox" checked={todo.completed} readOnly />
                <p>{todo.title}</p>

                <button
                  className="
                    TodoList__user-button
                    button
                  "
                  type="button"
                  onClick={() => selectUser(+todo.userId)}
                >
                  {`User #${todo.userId}`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
