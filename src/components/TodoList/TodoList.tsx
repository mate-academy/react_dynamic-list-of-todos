import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

interface State {
  filteredTitle: string;
  filteredBy: string;
}

interface Props {
  todos: Todo[];
  todoStatusChanger: (todoId: number) => void;
  getSelectedUserId: (selectedUserId: number) => void;
}

export class TodoList extends React.Component<Props, State> {
  state: State = {
    filteredTitle: '',
    filteredBy: 'all',
  };

  filterByTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({ filteredTitle: value });
  };

  filterByStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    this.setState({ filteredBy: value });
  };

  render() {
    const { todos, todoStatusChanger, getSelectedUserId } = this.props;
    const { filteredTitle, filteredBy } = this.state;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <p>{filteredBy}</p>

        <div className="TodoList__list-container">
          <form>
            <input
              name="todo-title"
              type="text"
              value={filteredTitle}
              onChange={(event) => this.filterByTitle(event)}
            />

            <select
              name="todo-filter"
              value={this.state.filteredBy}
              onChange={(event) => this.filterByStatus(event)}
            >
              <option value="all">
                All
              </option>
              <option value="active">
                Active
              </option>
              <option value="completed">
                Completed
              </option>
            </select>
          </form>

          <ul className="TodoList__list">
            {todos.map(todo => (
              <li
                key={todo.id}
                className={classNames(
                  'TodoList__item',
                  {
                    'TodoList__item--unchecked': !todo.completed,
                    'TodoList__item--checked': todo.completed,
                  },
                )}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onClick={() => todoStatusChanger(todo.id)}
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className="
                    TodoList__user-button
                    TodoList__user-button--selected
                    button
                  "
                  type="button"
                  onClick={() => getSelectedUserId(todo.userId)}
                >
                  {`User #${todo.userId}`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
