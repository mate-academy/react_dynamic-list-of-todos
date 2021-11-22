/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './TodoList.scss';

import classNames from 'classnames';

interface Props {
  todos: Todo[],
  selectUser: (userId: number) => void,
}

interface State {
  titleToSearch: string,
  completeStatus: string
}

export class TodoList extends React.Component<Props, State> {
  state = {
    titleToSearch: '',
    completeStatus: '',
  };

  handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    this.setState(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value.toLowerCase(),
    }));
  };

  preparedTodos = () => {
    const { titleToSearch, completeStatus } = this.state;

    return this.props.todos.filter(todo => {
      if (titleToSearch) {
        return todo.title.toLowerCase().includes(titleToSearch);
      }

      return todo;
    }).filter(todo => {
      if (completeStatus === 'completed') {
        return todo.completed;
      }

      if (completeStatus === 'not completed') {
        return todo.completed === false;
      }

      return todo;
    });
  };

  render() {
    const { titleToSearch, completeStatus } = this.state;

    return (
      <div className="TodoList">
        <div className="TodosSearch">
          <label
            htmlFor="title"
            className="TodosSearch__label"
          >
            Title:
            <input
              type="text"
              id="title"
              name="titleToSearch"
              value={titleToSearch}
              onChange={this.handleInputChange}
              placeholder="Task title"
            />
          </label>

          <label
            htmlFor="title"
            className="TodosSearch__label"
          >
            Status:
            <select
              name="completeStatus"
              id="userId"
              value={completeStatus}
              onChange={this.handleInputChange}
            >
              <option value="">
                Choose status
              </option>

              <option value="not completed">
                Not completed
              </option>

              <option value="completed">
                Completed
              </option>
            </select>
          </label>
        </div>

        <h2>Todos:</h2>

        {this.props.todos.length > 0 && (
          <div className="TodoList__list-container">
            <ul className="TodoList__list">
              {this.preparedTodos().map(todo => {
                const {
                  title, completed, id, userId,
                } = todo;

                return (
                  <li
                    className={classNames(
                      'TodoList__item',
                      { 'TodoList__item--checked': completed },
                      { 'TodoList__item--unchecked': !completed },
                    )}
                    key={id}
                  >
                    <label>
                      <input
                        type="checkbox"
                        checked={completed}
                        readOnly
                      />
                      <p>{title}</p>
                    </label>

                    <button
                      className="
                        TodoList__user-button
                        TodoList__user-button--selected
                        button
                      "
                      type="button"
                      onClick={() => this.props.selectUser(userId)}
                    >
                      {`User ${userId}`}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }
}
