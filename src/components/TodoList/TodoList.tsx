/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import React from 'react';
import './TodoList.scss';

type Props = {
  todos: Todo[],
  selectedUserId: number,
  setTodosByChecked: (id: number) => void;
  setSelectedUserId: (id: number) => void;
};

type State = {
  searchRequest: string,
  filterBy: string,
  filteredTodos: Todo[],
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    searchRequest: '',
    filterBy: 'all',
    filteredTodos: this.props.todos,
  };

  componentDidUpdate(prevProps: Props) {
    if (prevProps.todos !== this.props.todos) {
      this.onUpdate();
    }
  }

  onUpdate = () => {
    this.setState({ filteredTodos: this.props.todos });
  };

  setSearchRequest = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchRequest: e.target.value });
    this.setFilteredTodos();
  };

  setFilterBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ filterBy: e.target.value });
    this.setFilteredTodos();
  };

  setFilteredTodos = () => {
    this.setState(prevState => {
      const { filterBy, searchRequest } = prevState;

      const newFilteredTodos = this.props.todos.filter(({ title, completed }) => {
        const isTitleIncludesRequest = title.toLowerCase().includes(searchRequest.toLowerCase());

        switch (filterBy) {
          case 'active':
            return !completed && isTitleIncludesRequest;
          case 'completed':
            return completed && isTitleIncludesRequest;
          default:
            return isTitleIncludesRequest;
        }
      });

      return { filteredTodos: newFilteredTodos };
    });
  };

  render() {
    const { filteredTodos } = this.state;
    const { selectedUserId, setTodosByChecked, setSelectedUserId } = this.props;
    const { setSearchRequest, setFilterBy } = this;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <label>
          Find todo:
          <input
            type="text"
            className="TodoList__search-bar"
            placeholder="write a title"
            value={this.state.searchRequest}
            onChange={setSearchRequest}
          />
        </label>
        <select onChange={setFilterBy}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <li
                key={todo.id}
                className={classNames(
                  'TodoList__item',
                  { 'TodoList__item--unchecked': !todo.completed },
                  { 'TodoList__item--checked': todo.completed },
                )}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => setTodosByChecked(todo.id)}
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classNames(
                    'TodoList__user-button',
                    { 'TodoList__user-button--selected': selectedUserId === todo.userId },
                    'button',
                  )}
                  type="button"
                  onClick={() => setSelectedUserId(todo.userId)}
                >
                  User #
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
