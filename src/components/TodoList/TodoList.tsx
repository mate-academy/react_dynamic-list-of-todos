import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

type Props = {
  todos: Todo[],
  selectedUserId: number,
  getSelectedUser: (userId: number) => void,
};

interface State {
  query: string,
  todoStatus: string,
}

export class TodoList extends React.Component<Props, State> {
  state: State = {
    query: '',
    todoStatus: 'all',
  };

  handleSelectByStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    this.setState({
      todoStatus: value,
    });
  };

  queryHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({
      query: value,
    });
  };

  filterTodos() {
    const { query, todoStatus } = this.state;
    const copyTodos = [...this.props.todos].filter((todo) => (
      todo.title.toLowerCase().includes(query.toLowerCase())
    ));

    switch (todoStatus) {
      case 'all': {
        return copyTodos;
      }

      case 'finished': {
        return copyTodos.filter(todo => todo.completed === true);
      }

      case 'unfinished': {
        return copyTodos.filter(todo => todo.completed === false);
      }

      default: {
        return copyTodos;
      }
    }
  }

  render() {
    const { getSelectedUser } = this.props;
    const todos = this.filterTodos();

    return (
      <div className="TodoList">
        <label htmlFor="selectTodosByStatus">
          Choose an status of todo:
          <select
            value={this.state.query}
            onChange={this.handleSelectByStatus}
          >
            <option value="all">All</option>
            <option value="finished">Finished</option>
            <option value="unfinished">Unfinished</option>
          </select>
        </label>
        <input
          type="text"
          placeholder="search"
          value={this.state.query}
          onChange={this.queryHandler}
        />
        <h2>Todos:</h2>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={classNames(
                  'TodoList__item',
                  { 'TodoList__item--checked': todo.completed },
                  { 'TodoList__item--unchecked': !todo.completed },
                )}
              >
                <label htmlFor="todo">
                  <input
                    type="checkbox"
                    readOnly
                    checked={todo.completed}
                  />
                  <p>{todo.title}</p>
                </label>
                <button
                  className={classNames('TodoList__user-button button',
                    { 'TodoList__user-button--selected': todo.userId === this.props.selectedUserId })}
                  type="button"
                  onClick={() => {
                    getSelectedUser(todo.userId);
                  }}
                >
                  User&nbsp;
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
