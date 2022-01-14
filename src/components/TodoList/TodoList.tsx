/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import React from 'react';
import './TodoList.scss';

type Props = {
  todos: Todo[];
  onSelectUser(userId:number): void,
  selectedUserId: number,
  handleChecked(id:number): void,
};

type State = {
  titleQuery: string;
  status: string;
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    titleQuery: '',
    status: 'All',
  };

  handleChange = (
    e:React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    } as Pick<State, 'titleQuery'>);
  };

  TodosToDisplay = () => {
    const { titleQuery, status } = this.state;

    const filterByStatus = (todo:Todo) => {
      switch (status) {
        case 'completed':
          return todo.completed;
        case 'notCompleted':
          return !todo.completed;
        default:
          return true;
      }
    };

    return this.props.todos.filter(todo => (
      todo.title.toLowerCase().includes(titleQuery.toLowerCase())
      && filterByStatus(todo)
    ));
  };

  render() {
    const { todos, selectedUserId, onSelectUser } = this.props;
    const { status } = this.state;

    const displayedTodos = this.TodosToDisplay();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div>
          <input
            type="text"
            placeholder="Search for todos"
            className="filterTodo"
            name="titleQuery"
            onChange={this.handleChange}
          />

          <select
            className="filterTodo"
            name="status"
            id=""
            defaultValue={status}
            onChange={this.handleChange}
          >
            <option value="All">All</option>
            <option value="completed">Completed</option>
            <option value="notCompleted">Still in process</option>
          </select>
        </div>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todos && displayedTodos.map((todo) => (
              <li
                className={todo.completed
                  ? 'TodoList__item TodoList__item--checked'
                  : 'TodoList__item TodoList__item--unchecked'}
                key={todo.id}
              >
                <label>
                  <input
                    type="checkbox"
                    readOnly
                    checked={todo.completed}
                    onChange={() => {
                      this.props.handleChecked(todo.id);
                    }}
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classNames(
                    'TodoList__user-button button', { 'TodoList__user-button--selected': todo.userId === selectedUserId },
                  )}
                  type="button"
                  onClick={() => onSelectUser(todo.userId)}
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
