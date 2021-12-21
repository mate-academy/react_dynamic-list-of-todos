import React from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import './TodoList.scss';

type Props = {
  todos: Todo[]
  selectUser: (ususerId:number) => void,
};

type State = {
  value: string,
  selected: string,
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    value: '',
    selected: 'all',
  };

  getPreparedTodos = () => this.props.todos.filter(todo => {
    switch (this.state.selected) {
      case 'completed':
        return todo.completed === true;
      case 'active':
        return todo.completed === false;
      default:
        return todo;
    }
  });

  render() {
    const { selectUser } = this.props;
    const filtredTodos = this.getPreparedTodos()
      .filter(todo => todo.title.includes(this.state.value));

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <input
            placeholder="Enter the title of todo"
            value={this.state.value}
            onChange={(event) => this.setState({ value: event.target.value })}
          />

          <select
            value={this.state.selected}
            onChange={(event) => this.setState({ selected: event.target.value })}
          >
            <option value="all">
              All
            </option>

            <option value="active">
              Active
            </option>

            <option value="completed">
              Completed
            </option>
          </select>

          <ul className="TodoList__list">
            {filtredTodos.map(todo => (
              <li
                className={classNames(
                  'TodoList__item',
                  { 'TodoList__item--checked': todo.completed },
                  { 'TodoList__item--unchecked': !todo.completed },
                )}
                key={todo.id}
              >
                <label htmlFor={String(todo.id)}>
                  <input
                    type="checkbox"
                    id={String(todo.id)}
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
                    selectUser(todo.userId);
                  }}
                >
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
