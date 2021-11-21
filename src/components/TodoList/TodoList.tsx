import React from 'react';
import './TodoList.scss';
import { Todo } from '../../react-app-env';

interface Props {
  todos: Todo[] | [],
  selectedIdUser: number,
  selectUserId: (userId: number) => void,
}

interface State {
  query: string,
  selectedStatus: string,
}

export class TodoList extends React.Component<Props, State> {
  state: State = {
    query: '',
    selectedStatus: 'all',
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;

    this.setState({
      query: target.value,
    });
  };

  checkTodosTitle = (...args: string[]) => {
    return args.some(todo => todo.toLowerCase().includes(this.state.query.toLowerCase()));
  };

  checkTodosCompleted = (completedStatus: boolean, status: string) => {
    switch (status) {
      case 'active':
        return completedStatus === false;
      case 'completed':
        return completedStatus === true;
      default:
        return completedStatus === true || completedStatus === false;
    }
  };

  changeTodoHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectedStatus: event.target.value,
    });
  };

  render() {
    const { query, selectedStatus } = this.state;
    const { todos, selectUserId, selectedIdUser } = this.props;
    const visibleTodos = todos.filter(
      todo => this.checkTodosTitle(todo.title)
        && this.checkTodosCompleted(todo.completed, selectedStatus),
    );

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__field">
          <label htmlFor="search-query" className="label">
            <span className="label__text">Search todo</span>
            <input
              type="text"
              id="search-query"
              className="input"
              placeholder="Type search word"
              value={query}
              onChange={this.handleChange}
            />
          </label>

          <select
            name="todoList"
            id=""
            value={selectedStatus}
            onChange={this.changeTodoHandler}
            className="select"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {visibleTodos.map(todo => (
              <li
                key={todo.id}
                className="TodoList__item TodoList__item--unchecked"
              >
                <label htmlFor="check1">
                  <input
                    type="checkbox"
                    id="check1"
                    checked={todo.completed}
                    readOnly
                  />
                  <p>{todo.title}</p>
                </label>

                {(todo.userId === selectedIdUser) ? (
                  <button
                    className="
                  TodoList__user-button
                  button
                "
                    type="button"
                    onClick={() => {
                      selectUserId(0);
                    }}
                  >
                    {todo.userId}
                  </button>
                ) : (
                  <button
                    className="
                  TodoList__user-button
                  TodoList__user-button--selected
                  button
                "
                    type="button"
                    onClick={() => {
                      selectUserId(todo.userId);
                    }}
                  >
                    {todo.userId}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
