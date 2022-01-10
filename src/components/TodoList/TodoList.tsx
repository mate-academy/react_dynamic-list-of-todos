/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import './TodoList.scss';
import { Todo } from '../../type/todo';

interface Props {
  todos: Todo[],
  selectedUserId: number,
  handleSelectedUserId: (userId: number) => void,
}

const OShowTodos = {
  All: 0,
  Active: 1,
  Completed: 2,
} as const;

type ShowTodos = typeof OShowTodos[keyof typeof OShowTodos];

interface State {
  filterTitle: string,
  selectedTodo: ShowTodos,
}

export class TodoList extends React.Component<Props, State> {
  state: State = {
    filterTitle: '',
    selectedTodo: OShowTodos.All,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ filterTitle: event.target.value });
  };

  handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case 'Active':
        this.setState({ selectedTodo: OShowTodos.Active });
        break;
      case 'Completed':
        this.setState({ selectedTodo: OShowTodos.Completed });
        break;
      default:
        this.setState({ selectedTodo: OShowTodos.All });
        break;
    }
  };

  render() {
    const { todos, selectedUserId, handleSelectedUserId } = this.props;
    const { filterTitle, selectedTodo } = this.state;
    const filteredTodos = filterTitle
      ? todos.filter(todo => todo.title.includes(filterTitle))
      : todos;

    let selectedTodos = null;

    switch (selectedTodo) {
      case OShowTodos.Active:
        selectedTodos = filteredTodos.filter(todo => !todo.completed);
        break;
      case OShowTodos.Completed:
        selectedTodos = filteredTodos.filter(todo => todo.completed);
        break;

      default:
        selectedTodos = filteredTodos;
        break;
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <label htmlFor="filter">
            Filter the todos by title:
            <input
              id="filter"
              type="input"
              name="filter"
              title="filter"
              placeholder="Enter a title"
              onChange={this.handleChange}
            />
          </label>
          <select onChange={this.handleSelectChange} title="select">
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
          <ul className="TodoList__list">
            {selectedTodos.map(todo => (
              <li
                key={todo.id}
                className={`TodoList__item TodoList__item--${todo.completed ? 'checked' : 'unchecked'}`}
              >
                <label htmlFor={todo.id.toString()}>
                  <input
                    id={todo.id.toString()}
                    type="checkbox"
                    readOnly
                    checked={todo.completed}
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={`
              TodoList__user-button
              ${todo.userId === selectedUserId ? 'TodoList__user-button--selected' : undefined}
              button
            `}
                  type="button"
                  onClick={() => handleSelectedUserId(todo.userId)}
                >
                  User #
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
