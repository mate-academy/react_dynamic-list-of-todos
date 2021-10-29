import React, { ChangeEvent } from 'react';

import './TodoList.scss';

type Props = {
  todos: Todo[];
  selectUserId: (id: number) => void;
};

type State = {
  searcInput: string;
  optionSelected: string,
};

export class TodoList extends React.Component<Props, State> {
  state = {
    searcInput: '',
    optionSelected: 'all',
  };

  handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    this.setState({ optionSelected: e.target.value });
  };

  searcInput = (e: string) => {
    this.setState({ searcInput: e });
  };

  render() {
    const { todos, selectUserId } = this.props;
    const { searcInput, optionSelected } = this.state;

    let todosFiltered = todos.filter(({ title }) => (
      title.toLowerCase().includes(searcInput.toLowerCase().trim())
    ));

    if (optionSelected === 'completed') {
      todosFiltered = todosFiltered.filter(({ completed }) => completed === true);
    } else if (optionSelected === 'inProgress') {
      todosFiltered = todosFiltered.filter(({ completed }) => completed === false);
    }

    return (
      <div className="TodoList">
        <h2
          className="title is-2"
        >
          Todos:
        </h2>

        <form action="">
          <input
            type="text"
            className="input"
            placeholder="Write a title here"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              this.searcInput(e.target.value);
            }}
          />
          <select
            id="select"
            className="select is-fullwidth mt-3 mb-5"
            onChange={this.handleSelect}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="inProgress">In progress</option>
          </select>
        </form>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todosFiltered.map(todo => (
              <li
                key={todo.id}
                className={
                  todo.completed === false
                    ? 'TodoList__item TodoList__item--unchecked'
                    : 'TodoList__item TodoList__item--checked'
                }
              >
                <label htmlFor="title">
                  <input
                    type="checkbox"
                    readOnly
                    id="title"
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  type="button"
                  className="button is-info is-normal"
                  onClick={() => selectUserId(todo.userId)}
                >
                  {`User: ${todo.userId}`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
