import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  selectedUserId: number;
  selectUser: (userId: number) => void;
};

type State = {
  title: string;
  selectValue: number;
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    title: '',
    selectValue: 0,
  };

  handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({ title: event.target.value });
  };

  handleSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    this.setState({ selectValue: +event.target.value });
  };

  render() {
    const { todos, selectedUserId, selectUser } = this.props;
    const { title, selectValue } = this.state;

    let filteredTodos = todos.filter(todo => {
      return todo.title.toLowerCase().includes(this.state.title.toLowerCase());
    });

    if (selectValue === 1) {
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
    }

    if (selectValue === 2) {
      filteredTodos = filteredTodos.filter(todo => todo.completed);
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={this.handleChange}
        />
        <select
          value={selectValue}
          onChange={this.handleSelectChange}
        >
          <option value="0">All</option>
          <option value="1">Active</option>
          <option value="2">Completed</option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map((todo: Todo) => {
              return (
                <li
                  className={classNames(
                    'TodoList__item',
                    { 'TodoList__item--checked': todo.completed },
                    { 'TodoList__item--unchecked': !todo.completed },
                  )}
                  key={todo.id}
                >
                  <label htmlFor="check">
                    <input
                      type="checkbox"
                      id="check"
                      checked={todo.completed}
                      readOnly
                    />
                    <p>{todo.title}</p>
                  </label>

                  <button
                    className={classNames(
                      'TodoList__user-button',
                      'button',
                      { 'TodoList__user-button--selected': todo.userId === selectedUserId },
                    )}
                    type="button"
                    onClick={() => {
                      selectUser(todo.userId);
                    }}
                  >
                    User&nbsp;#
                    {todo.userId}
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
