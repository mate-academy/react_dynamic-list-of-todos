import React from 'react';
import classNames from 'classnames';
import './TodoList.scss';

enum SortType {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

type Props = {
  todos: Todo[];
  selectUser: (userId: number) => void;
};

type State = {
  query: string;
  typeOfSort: SortType;
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    query: '',
    typeOfSort: SortType.All,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    } as { [K in keyof State]: State[K] });
  };

  sortedTodos = () => {
    const { query, typeOfSort } = this.state;
    const { todos } = this.props;
    const lowQuery = query.toLowerCase();

    switch (typeOfSort) {
      case SortType.Active:
        return todos.filter(todo => (
          todo.title
            && todo.title.toLowerCase().includes(lowQuery)
            && !todo.completed
        ));

      case SortType.Completed:
        return todos.filter(todo => (
          todo.title
            && todo.title.toLowerCase().includes(lowQuery)
            && todo.completed
        ));

      case SortType.All:
        return todos.filter(todo => (
          todo.title && todo.title.toLowerCase().includes(lowQuery)
        ));

      default:
        throw new Error('Some error in sort');
    }
  };

  render() {
    const { query, typeOfSort } = this.state;
    const { selectUser } = this.props;

    const actualTodos = this.sortedTodos();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <form
          className="TodoList__form"
          onSubmit={event => {
            event.preventDefault();
          }}
        >
          <input
            className="TodoList__form-input"
            placeholder="Search"
            type="text"
            name="query"
            value={query}
            onChange={this.handleChange}
          />

          <select
            className="TodoList__form-select"
            name="typeOfSort"
            value={typeOfSort}
            onChange={this.handleChange}
          >
            <option
              value=""
              disabled
            >
              Sort by status
            </option>
            <option
              value={SortType.All}
            >
              All
            </option>

            <option
              value={SortType.Active}
            >
              Active
            </option>

            <option
              value={SortType.Completed}
            >
              Completed
            </option>
          </select>
        </form>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {actualTodos.map(todo => (
              <li
                className={classNames('TodoList__item', {
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': todo.completed,
                })}
                key={todo.id}
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
                    selectUser(todo.userId);
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
