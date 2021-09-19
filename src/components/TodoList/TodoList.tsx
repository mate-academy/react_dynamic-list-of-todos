import React from 'react';
import cn from 'classnames';
import './TodoList.scss';

interface Props {
  onUserSelection: (userId: number) => void;
  todos: Todo[];
}

interface State {
  todos: Todo[];
  query: string;
  statusOfFilter: string;
}

export class TodoList extends React.Component<Props> {
  state: State = {
    todos: [...this.props.todos],
    query: '',
    statusOfFilter: '',
  };

  handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      statusOfFilter: event.target.value,
    });
  };

  render() {
    const { onUserSelection } = this.props;
    const lowerCaseQuery = this.state.query.toLowerCase();
    let todosFilter = this.state.todos.filter(todo => (
      todo.title.toLowerCase().includes(lowerCaseQuery)
    ));

    if (this.state.statusOfFilter === 'active') {
      todosFilter = todosFilter.filter(todo => !todo.completed);
    }

    if (this.state.statusOfFilter === 'completed') {
      todosFilter = todosFilter.filter(todo => todo.completed);
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__inputs">
          <input
            type="text"
            value={this.state.query}
            className="TodoList__input"
            placeholder="Input title"
            onChange={(event) => {
              this.setState({
                query: event.target.value,
              });
            }}
          />

          <select
            className="TodoList__input"
            id="selectUser"
            name="user"
            value={this.state.statusOfFilter}
            onChange={this.handleChange}
          >
            <option value="">
              Choose a user
            </option>
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

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todosFilter.map((todo) => (
              <li
                key={todo.id}
                className={cn(
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
                    readOnly
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
                  onClick={() => {
                    onUserSelection(todo.userId);
                  }}
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
