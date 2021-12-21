import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types';
import './TodoList.scss';

type Props = {
  todos: Todo[];
  selectedUser: number;
  onSelectUser (userId: number): void;
};

type State = {
  titleQuery: string;
  selectedStatus: string;
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    titleQuery: '',
    selectedStatus: 'all',
  };

  handleChange = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    switch (name) {
      case 'titleQuery': {
        this.setState({ titleQuery: value });
        break;
      }

      case 'selectedStatus': {
        this.setState({ selectedStatus: value });
        break;
      }

      default: {
        break;
      }
    }
  };

  filterTodo = () => {
    const { todos } = this.props;
    const { titleQuery, selectedStatus } = this.state;

    switch (selectedStatus) {
      case 'active': {
        return todos.filter(todo => (!todo.completed && todo.title.includes(titleQuery)));
        break;
      }

      case 'completed': {
        return todos.filter(todo => (todo.completed && todo.title.includes(titleQuery)));
        break;
      }

      default: {
        return todos.filter(todo => (todo.title.includes(titleQuery)));
      }
    }
  };

  render(): React.ReactNode {
    const { selectedUser, onSelectUser } = this.props;
    const { titleQuery, selectedStatus } = this.state;
    const filteredTodos = this.filterTodo();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <form className="TodoList__form">
          <label htmlFor="title-input">
            Todo title:
            <input
              className="TodoList__form-input"
              type="text"
              name="titleQuery"
              id="title-input"
              placeholder="type title here..."
              value={titleQuery}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="select-status">
            Todo status:
            <select
              className="TodoList__form-select"
              name="selectedStatus"
              id="select-status"
              value={selectedStatus}
              onChange={this.handleChange}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </label>
        </form>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(todo => {
              const {
                completed, title, id, userId,
              } = todo;
              const isSelected = todo.userId === selectedUser;

              return (
                <li
                  className={classNames('TodoList__item', {
                    'TodoList__item--checked': completed,
                    'TodoList__item--unchecked': !completed,
                  })}
                  key={id}
                >
                  <label htmlFor="input-checkbox">
                    <input
                      type="checkbox"
                      checked={completed}
                      id="input-checkbox"
                      readOnly
                    />
                    <p>{title}</p>
                  </label>

                  <button
                    className={classNames('button', 'TodoList__user-button',
                      { 'TodoList__user-button--selected': isSelected })}
                    type="button"
                    onClick={() => onSelectUser(userId)}
                  >
                    {`User #${userId}`}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
