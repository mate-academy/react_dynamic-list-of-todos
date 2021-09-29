import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

type Props = {
  onUserSelection: (userId: number) => void;
  todos: Todo[];
};

type State = {
  query: string;
  selectedTodo: string;
};

export class TodoList extends React.Component<Props, State> {
  state = {
    query: '',
    selectedTodo: 'allTodos',
  };

  getVisibleTodo = () => {
    const { todos } = this.props;
    const { query, selectedTodo } = this.state;

    let visibleTodo = todos;

    if (query) {
      const lowerQuery = query.toLocaleLowerCase();

      visibleTodo = todos.filter(todo => todo.title.toLocaleLowerCase().includes(lowerQuery));
    }

    switch (selectedTodo) {
      case 'active':
        return visibleTodo.filter(todo => !todo.completed);

      case 'completed':
        return visibleTodo.filter(todo => todo.completed);

      default:
        break;
    }

    return visibleTodo;
  };

  render() {
    const { onUserSelection } = this.props;
    const { query, selectedTodo } = this.state;

    const visibleTodo = this.getVisibleTodo();

    return (
      <div className="TodoList">
        <div className="TodoList__nav">
          <div>
            <input
              type="text"
              placeholder="Enter todo"
              value={query}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                this.setState({ query: event.target.value });
              }}
            />
          </div>
          <select
            name="todos"
            value={selectedTodo}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              this.setState({ selectedTodo: event.target.value });
            }}
          >
            <option value="allTodos">
              All todos
            </option>
            <option value="active">
              Active todos
            </option>
            <option value="completed">
              Completed todos
            </option>
          </select>
        </div>
        <h2>
          Todos:
        </h2>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {visibleTodo.map(todo => (
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
                  onClick={() => onUserSelection(todo.userId)}
                  type="button"
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
