import React, { ChangeEvent } from 'react';
import './TodoList.scss';
import classNames from 'classnames';

interface Props {
  todos: Todo[],
  selectUser: (userid: number) => void,
  selectedUserId: number,
}

interface State {
  title: string,
  select: string,
}

export class TodoList extends React.Component<Props, State> {
  state = {
    title: '',
    select: 'all',
  };

  handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState(prevState => ({
      ...prevState,
      title: event.target.value,
    }));
  };

  handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    this.setState(prevState => ({
      ...prevState,
      select: event.target.value,
    }));
  };

  filterTodos = (a: Todo[]) => {
    return a.filter(todo => (
      todo.title.toLowerCase().includes(this.state.title.toLowerCase())
    ));
  };

  readyTodos = () => {
    const { select } = this.state;
    const { todos } = this.props;

    switch (select) {
      case 'all':
        return this.filterTodos(todos);

      case 'completed':
        return this.filterTodos(todos.filter(todo => todo.completed));

      case 'active':
        return this.filterTodos(todos.filter(todo => !todo.completed));

      default:
        throw new Error('Error');
    }
  };

  render() {
    const { title, select } = this.state;
    const { selectUser, selectedUserId } = this.props;

    const selectTodos = this.readyTodos();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <form>
          <label htmlFor="search">
            Search by title&nbsp;
            <input
              id="search"
              type="text"
              value={title}
              onChange={this.handleInput}
              placeholder="Search"
            />
          </label>

          <label htmlFor="todoStatus">
            <select
              id="todoStatus"
              value={select}
              onChange={this.handleSelect}
            >
              <option value="all">all</option>
              <option value="completed">completed</option>
              <option value="active">active</option>
            </select>
          </label>
        </form>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {selectTodos.map(todo => (
              <li
                key={todo.id}
                className={classNames(
                  'TodoList__item',
                  {
                    'TodoList__item--unchecked': todo.completed,
                    'TodoList__item--checked': !todo.completed,
                  },
                )}
              >
                <label
                  htmlFor="unchecked"
                >
                  <input
                    type="checkbox"
                    readOnly
                    id="unchecked"
                    checked={todo.completed}
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classNames(
                    'TodoList__user-button',
                    { 'TodoList__user-button--selected': selectedUserId === todo.userId },
                  )}
                  type="button"
                  onClick={() => selectUser(todo.userId)}
                >
                  User&nbsp;#
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
