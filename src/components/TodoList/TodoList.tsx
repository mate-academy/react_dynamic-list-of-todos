import classNames from 'classnames';
import React from 'react';
import './TodoList.scss';

type Props = {
  onUserSelection: (userId: number) => void;
  todos: Todo[];
};

type State = {
  value: string;
  show: string;
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    value: '',
    show: 'all',
  };

  onClear = () => {
    this.setState({ value: '' });
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;

    this.setState(() => ({
      value,
    }));
  };

  handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.currentTarget;

    // eslint-disable-next-line no-console
    console.log(value);

    if (value === this.state.show) {
      return;
    }

    this.setState({ show: value });
  };

  filterTodos = (todo: Todo) => {
    const { show, value } = this.state;
    const isAll = show === 'all';
    const showTodo = todo.title.includes(value);
    const isCompleted = show === 'completed';
    const isActive = show === 'active';

    if (isActive) {
      return showTodo && todo.completed === false;
    }

    if (isCompleted) {
      return showTodo && todo.completed === true;
    }

    return showTodo && isAll;
  };

  render() {
    const { value } = this.state;
    const { todos, onUserSelection } = this.props;

    const viewTodos = todos.filter(this.filterTodos);

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__buttons">
          <label>
            <input
              type="text"
              placeholder="filter by: "
              value={value}
              onChange={this.handleChange}
              className="TodoList__input"
            />

            <button
              type="button"
              className="button"
              onClick={this.onClear}
            >
              X
            </button>
          </label>

          <label>
            <select
              name="showGoods"
              id="showGoods"
              onChange={this.handleSelect}
              className="TodoList__input"
            >
              <option value="all">show all</option>
              <option value="active">show all active</option>
              <option value="completed">show all completed</option>
            </select>
          </label>
        </div>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {viewTodos.map((todo) => (
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
                    checked={todo.completed}
                    readOnly
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
                    onUserSelection(todo.userId);
                  }}
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
