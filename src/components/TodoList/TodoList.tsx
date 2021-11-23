import React from 'react';
import './TodoList.scss';

import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[],
  buttonHandler: (userId: number) => void,
}

interface State {
  query: string,
  statusSearch: string,
}

export class TodoList extends React.PureComponent<Props, State> {
  state = {
    query: '',
    statusSearch: 'all',
  };

  queryHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ statusSearch: event.target.value });
  };

  todoFinder = () => {
    const { todos } = this.props;
    const { query, statusSearch } = this.state;

    return todos
      .filter(todo => todo.title.toLowerCase()
        .includes(query.toLowerCase()))
      .filter(todo => {
        switch (statusSearch) {
          case 'completed':
            return todo.completed;

          case 'active':
            return todo.completed === false;

          default:
            return todo;
        }
      });
  };

  render() {
    const { buttonHandler } = this.props;
    const { query } = this.state;
    const sortedTodos = this.todoFinder();

    return (
      <div className="TodoList">
        <input
          value={query}
          type="text"
          placeholder="Title..."
          onChange={this.queryHandler}
        />
        <select onChange={this.selectHandler}>
          <option value="all">
            All
          </option>
          <option value="completed">
            Completed
          </option>
          <option value="active">
            Still in progress
          </option>
        </select>
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {
              sortedTodos.map((todo) => (
                <li
                  className={
                    todo.completed
                      ? 'TodoList__item TodoList__item--checked'
                      : 'TodoList__item TodoList__item--unchecked'
                  }
                  key={todo.id}
                >
                  <input type="checkbox" readOnly />
                  <p>{todo.title}</p>

                  <button
                    className="
                  TodoList__user-button
                  button
                "
                    type="button"
                    onClick={() => buttonHandler(todo.userId)}
                  >
                    {`User ${todo.userId}`}
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
