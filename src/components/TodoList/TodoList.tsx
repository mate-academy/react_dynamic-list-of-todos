import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

interface Props {
  todos: Todo[];
  todoStatusChanger: (todoId: number) => void;
  getSelectedUserId: (selectedUserId: number) => void;
  statusFilter: (status: string) => void;
  titleFilter: (filterFor: string) => void;
}

interface State {
  filteredTitle: string;
  filteredByStatus: string;
}

export class TodoList extends React.Component<Props, State> {
  state = {
    filteredTitle: '',
    filteredByStatus: 'all',
  };

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { statusFilter, titleFilter } = prevProps;
    const { filteredByStatus, filteredTitle } = this.state;

    if (prevState !== this.state) {
      statusFilter(filteredByStatus);
      titleFilter(filteredTitle);
    }
  }

  selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    this.setState({ filteredByStatus: value });
  };

  changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({ filteredTitle: value });
  };

  render() {
    const { todos, todoStatusChanger, getSelectedUserId } = this.props;
    const { filteredTitle, filteredByStatus } = this.state;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <form className="field">
          <div className="control mb-3">
            <input
              name="todo-title"
              type="text"
              value={filteredTitle}
              onChange={(event) => this.changeHandler(event)}
              className="input"
            />
          </div>

          <div className="control">
            <div className="select">
              <select
                name="todo-filter"
                value={filteredByStatus}
                onChange={(event) => this.selectHandler(event)}
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
            </div>
          </div>
        </form>

        <div className="TodoList__list-container">
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
