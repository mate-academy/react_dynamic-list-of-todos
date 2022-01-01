/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import React from 'react';
import './TodoList.scss';

type Props = {
  todos: Todo[] | [],
  isLoading: boolean,
  selectedUserId: number,
  setTodosByChecked: (id: number) => void;
  setSelectedUserId: (id: number) => void;
};

type State = {
  searchRequest: string,
  filterBy: string,
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    searchRequest: '',
    filterBy: 'all',
  };

  setSearchRequest = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchRequest: e.target.value });
  };

  setFilterBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ filterBy: e.target.value });
  };

  getfilteredTodos = () => {
    const { todos } = this.props;
    const { filterBy, searchRequest } = this.state;

    const filteredTodosByComplete = todos.filter(({ completed }) => {
      switch (filterBy) {
        case 'active':
          return !completed;
        case 'completed':
          return completed;
        default:
          return true;
      }
    });

    const filteredTodosByTitle = filteredTodosByComplete.filter(({ title }) => {
      return title.toLowerCase().includes(searchRequest.toLowerCase());
    });

    return filteredTodosByTitle;
  };

  render() {
    const {
      isLoading,
      selectedUserId,
      setTodosByChecked,
      setSelectedUserId,
    } = this.props;
    const { getfilteredTodos, setSearchRequest, setFilterBy } = this;
    const todos = getfilteredTodos();

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
          {isLoading ? (
            <div className="loader" />
          ) : (
            <ul className="TodoList__list">
              {todos.map(todo => (
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
          )}
        </div>
      </div>
    );
  }
}
