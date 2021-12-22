/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import classnames from 'classnames';
import { getTodos } from '../../api/api';
import { Todo } from '../../react-app-env';

import './TodoList.scss';

type Props = {
  onClick(id: number): void;
};

type State = {
  todos: Todo[];
  query: string;
  selectedTodos: string;
  // status: boolean;
};

export class TodoList extends React.Component<Props, State> {
  state = {
    todos: [],
    query: '',
    selectedTodos: 'all',
    // status: false,
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({ todos });
  }

  getInputParam = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState((state) => ({
      todos: state.todos.map((todo: Todo) => {
        const newTodo = todo;

        if (newTodo.id === Number(event.target.id)) {
          newTodo.completed = event.target.checked;
        }

        return newTodo;
      }),
    }));
  };

  handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    } as Pick<State, 'query' | 'selectedTodos'>);
  };

  render() {
    const {
      todos, query, selectedTodos,
    } = this.state;

    const searchedByTitleTodos = todos.filter(
      (todo: Todo) => todo.title.toLowerCase().includes(query.trim().toLowerCase()),
    );
    let preparedTodos: Todo[];

    switch (selectedTodos) {
      case 'active': {
        preparedTodos = searchedByTitleTodos.filter((todo: Todo) => !todo.completed);
        break;
      }

      case 'completed': {
        preparedTodos = searchedByTitleTodos.filter((todo: Todo) => todo.completed);
        break;
      }

      default: {
        preparedTodos = searchedByTitleTodos;
      }
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <input
          className="TodoList__title-input"
          name="query"
          type="text"
          value={query}
          onChange={this.handleOnChange}
          placeholder="Enter title of todo"
        />

        <select
          className="TodoList__select"
          name="selectedTodos"
          id="select"
          onChange={this.handleOnChange}
          value={selectedTodos}
        >
          <option value="all">
            all
          </option>

          <option value="active">
            active
          </option>

          <option value="completed">
            completed
          </option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {
              preparedTodos.map(({
                id, userId, title, completed,
              }) => (
                <li
                  className={classnames(
                    'TodoList__item',
                    { 'TodoList__item--unchecked': !completed },
                    { 'TodoList__item--checked': completed },
                  )}
                  key={id}
                >
                  <label>
                    <input
                      id={String(id)}
                      name="status"
                      type="checkbox"
                      onChange={this.getInputParam}
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
                    onClick={() => this.props.onClick(userId)}
                  >
                    User&nbsp;#
                    {userId}
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
