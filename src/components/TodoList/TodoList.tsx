import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import { Todo } from '../../react-app-env';

type Props = {
  todos: Todo[];
  selectedUser: number | null;
  onSelect: (id: number,) => void;
};

export class TodoList extends React.Component<Props, { searchQuery: string, selectQuery: string }> {
  state = {
    searchQuery: '',
    selectQuery: '',
  };

  setSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: event.currentTarget.value });
  };

  setSelectQuery = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ selectQuery: event.currentTarget.value });
  };

  render() {
    const { todos, selectedUser, onSelect } = this.props;
    const { searchQuery, selectQuery } = this.state;
    // console.log(selectQuery);
    const todosBySelect = todos.filter(todo => {
      switch (selectQuery) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          return todo;
      }
    });

    const todosToShow = todosBySelect.filter(todo => todo.title.includes(searchQuery));

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="field">
          <div className="control">
            <input
              value={this.state.searchQuery}
              onChange={this.setSearchQuery}
              className="input is-link"
              type="type"
              placeholder="Search in titles..."
            />
          </div>
          <div className="control">
            <select onChange={this.setSelectQuery}>
              <option defaultValue="" value="">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todosToShow.map(todo => (
              <li
                key={todo.id}
                className={`TodoList__item TodoList__item--${todo.completed ? 'checked' : 'unchecked'}`}
              >
                <label>
                  <input
                    checked={todo.completed}
                    type="checkbox"
                    readOnly
                  />
                  <p>{todo.title}</p>
                </label>
                <button
                  className={classNames(
                    'button',
                    'TodoList__user-button',
                    { 'TodoList__user-button--selected': +todo.userId === selectedUser },
                  )}
                  type="button"
                  onClick={() => onSelect(+todo.userId)}
                >
                  {`User_${todo.userId}`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
