import React from 'react';
import { getTodos } from '../../API/api';
import './TodoList.scss';

type State = {
  todos: Todo[],
  filterInput: string,
  filterSelect: string,
};

type Props = {
  onUserChange: (selectedUserId: number) => void;
};

export class TodoList extends React.Component <Props, State> {
  state: State = {
    todos: [],
    filterInput: '',
    filterSelect: 'all',
  };

  componentDidMount() {
    getTodos()
      .then(todos => this.setState({ todos }));
  }

  render() {
    const { todos, filterInput, filterSelect } = this.state;
    let filteredTodos = todos.filter(todo => todo.title.includes(filterInput));

    switch (filterSelect) {
      case 'active':
        filteredTodos = filteredTodos.filter(todo => todo.completed === false);
        break;
      case 'completed':
        filteredTodos = filteredTodos.filter(todo => todo.completed === true);
        break;
      default:
        break;
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div className="TodoList__list-container">
          <form action="">
            Filter Todos by name
            <input
              type="text"
              placeholder="enter to filter todos"
              value={filterInput}
              onChange={(event) => this.setState({ filterInput: event?.target.value })}
            />
            <div>
              <label htmlFor="todos-select">
                Show todos:
                <select
                  name="todos-select"
                  id="todos-select"
                  value={filterSelect}
                  onChange={(event) => this.setState({
                    filterSelect: event.target.value,
                  })}
                >
                  <option value="all">all</option>
                  <option value="active">active</option>
                  <option value="completed">completed</option>
                </select>
              </label>
            </div>
          </form>
          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <li
                className={todo.completed
                  ? 'TodoList__item TodoList__item--checked'
                  : 'TodoList__item TodoList__item--unchecked'}
                key={todo.id}
              >
                <label htmlFor={`TodoList-input-${todo.id}`}>
                  <input type="checkbox" id={`TodoList-input-${todo.id}`} readOnly />
                  <p>{todo.title}</p>
                </label>
                <button
                  className={todo.completed
                    ? `TodoList__user-button
                    button`
                    : `TodoList__user-button
                    TodoList__user-button--selected
                    button`}
                  type="button"
                  onClick={() => this.props.onUserChange(todo.userId)}
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
