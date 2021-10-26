import React, { Component } from 'react';
import classNames from 'classnames';

import './TodoList.scss';

type Props = {
  todos: Todo[],
  users: User[],
  userId: number,
  selectUserId: (userId: number) => void,
};

type State = {
  inputData: string,
  filterBy: string,
};

export class TodoList extends Component<Props, State> {
  state = {
    inputData: '',
    filterBy: 'All',
  };

  titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { value } = event.target;

    this.setState({
      inputData: value,
    });
  };

  filterChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const { value } = event.target;

    this.setState({
      filterBy: value,
    });
  };

  onUserSelect = (selectedUserTodo: number) => (
    this.props.users.find(user => user.id === selectedUserTodo)
      ? this.props.users.find(user => user.id === selectedUserTodo)?.name
      : 'No user'
  );

  render() {
    const { todos, userId, selectUserId } = this.props;
    const { inputData, filterBy } = this.state;
    const { titleChangeHandler, filterChangeHandler, onUserSelect } = this;

    const visibleTodos: Todo[] = todos
      .filter(todo => (todo.title.toLowerCase()).includes(inputData.toLowerCase()))
      .filter(todo => {
        if (filterBy === 'Active') {
          return !todo.completed;
        }

        if (filterBy === 'Completed') {
          return todo.completed;
        }

        return todo;
      });

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <form action="">
          <input
            type="text"
            id="inputData"
            placeholder="Type to search todo"
            value={inputData}
            onChange={titleChangeHandler}
          />
          <select
            id="filterBy"
            name="filterBy"
            value={filterBy}
            onChange={filterChangeHandler}
          >
            <option value="All">All todos</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
        </form>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {
              visibleTodos
                .map(todo => (
                  <li
                    key={todo.id}
                    className={
                      classNames(
                        'TodoList__item',
                        { 'TodoList__item--checked': todo.completed },
                        { 'TodoList__item--unchecked': !todo.completed },
                      )
                    }
                  >
                    <label htmlFor={`${todo.id}`}>
                      <input
                        id={`${todo.id}`}
                        type="checkbox"
                        checked={todo.completed}
                        readOnly
                      />
                      <p>{todo.title}</p>
                    </label>

                    <button
                      onClick={() => (selectUserId(todo.userId))}
                      className={
                        classNames(
                          'button',
                          { 'TodoList__user-button--selected': userId !== 0 },
                        )
                      }
                      type="button"
                    >
                      {onUserSelect(todo.userId)}
                    </button>
                  </li>
                ))
            }
          </ul>
        </div>
      </div>
    );
  }
}
