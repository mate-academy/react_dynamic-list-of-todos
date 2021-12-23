/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import React from 'react';
import { Todo } from '../../react-app-env';
import './TodoList.scss';

interface Props {
  todos: Todo[];
  onSelectUserID(userId: number) : void;
  selectID: number;
}

interface State {
  inputValue?: string;
}

export class TodoList extends React.Component<Props, State> {
  state: State = {
    inputValue: '',
  };

  handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { todos, onSelectUserID, selectID } = this.props;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <input
          type="text"
          name="inputValue"
          className="TodoList__input-filter"
          value={this.state.inputValue}
          onChange={(e) => {
            this.handleChange(e);
          }}
        />

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todos
              .filter(todo => todo.title.includes(this.state.inputValue || ''))
              .map((todo: Todo) => {
                return (
                  <li
                    key={todo.id}
                    className={todo.completed
                      ? 'TodoList__item TodoList__item--checked'
                      : 'TodoList__item TodoList__item--unchecked'}
                  >
                    <label>
                      <input type="checkbox" readOnly checked={todo.completed} />
                      <p>{todo.title}</p>
                    </label>

                    <button
                      className={selectID === todo.userId
                        ? 'TodoList__user-button TodoList__user-button--selected button'
                        : 'TodoList__user-button button'}
                      type="button"
                      onClick={() => {
                        onSelectUserID(todo.userId);
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
