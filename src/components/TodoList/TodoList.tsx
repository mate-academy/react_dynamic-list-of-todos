/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './TodoList.scss';

type Props = {
  todos: Todo[];
  selectedUserId: (arg1: number) => void;
};

type State = {
  query: string,
  sort: string,
};

export class TodoList extends React.Component<Props> {
  state: State = {
    query: '',
    sort: '',
  };

  changeTodos = (event: FilterEvent) => {
    this.setState(state => ({
      ...state,
      sort: event.target.value,
    }));
  };

  filterTodos = (todos: Todo[], sort: string) => {
    switch (sort) {
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'active':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  };

  visibleTodos = () => {
    const { query, sort } = this.state;
    const { todos } = this.props;

    const visibleTodos = todos.filter(todo => {
      return todo.title.toLocaleLowerCase().includes(query);
    });

    return this.filterTodos(visibleTodos, sort);
  };

  render() {
    const { selectedUserId } = this.props;
    const { sort } = this.state;

    const newTodos = this.visibleTodos();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <form>
            <select
              value={sort}
              onChange={this.changeTodos}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
            <input
              type="text"
              placeholder="Search..."
              value={this.state.query}
              onChange={event => {
                this.setState({
                  query: event.target.value,
                });
              }}
            />
          </form>
          <ul className="TodoList__list">
            {newTodos.map(todo => (
              (todo.completed) ? (
                <li
                  key={todo.id}
                  className="TodoList__item TodoList__item--checked"
                >
                  <label>
                    <input type="checkbox" readOnly checked />
                    <p>{todo.title}</p>
                  </label>

                  <button
                    className="
                      TodoList__user-button
                      TodoList__user-button--selected
                      button
                    "
                    type="button"
                    onClick={() => selectedUserId(todo.userId)}
                  >
                    User
                    {' '}
                    {todo.userId}
                  </button>
                </li>
              ) : (
                <li
                  key={todo.id}
                  className="TodoList__item TodoList__item--unchecked"
                >
                  <label>
                    <input type="checkbox" readOnly />
                    <p>{todo.title}</p>
                  </label>

                  <button
                    className="
                      TodoList__user-button
                      TodoList__user-button--selected
                      button
                    "
                    type="button"
                    onClick={() => selectedUserId(todo.userId)}
                  >
                    User
                    {' '}
                    {todo.userId}
                  </button>
                </li>
              )
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
