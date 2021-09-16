import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

interface Props {
  todos: Todo[];
  updateUserId: (id: number) => void;
}

interface State {
  inputQuery: string;
  filterQuery: FilterType;
}

enum FilterType {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export class TodoList extends React.Component<Props, State> {
  state: State = {
    inputQuery: '',
    filterQuery: FilterType.All,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    } as Pick<State, keyof State>);
  };

  getVisibleList = () => {
    const { inputQuery, filterQuery } = this.state;
    const { todos } = this.props;

    if (filterQuery === FilterType.Active) {
      return todos.filter(todo => (
        todo.title
        && (todo.title.toLowerCase().includes(inputQuery) && !todo.completed)
      ));
    }

    if (filterQuery === FilterType.Completed) {
      return todos.filter(todo => (
        todo.title
        && (todo.title.toLowerCase().includes(inputQuery) && todo.completed)
      ));
    }

    return todos.filter(todo => (
      todo.title && todo.title.toLowerCase().includes(inputQuery)
    ));
  };

  render() {
    const { inputQuery, filterQuery } = this.state;

    const visibleTodos = this.getVisibleList();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <form
          className="text-center"
          onSubmit={event => {
            event.preventDefault();
          }}
        >
          <input
            className="mb-2 border border-secondary rounded"
            placeholder="Provide title"
            type="text"
            name="inputQuery"
            value={inputQuery}
            onChange={this.handleChange}
          />

          <select
            className="mb-2 ms-2 border border-secondary rounded"
            name="filterQuery"
            value={filterQuery}
            onChange={this.handleChange}
          >
            <option
              value={FilterType.All}
            >
              All
            </option>

            <option
              value={FilterType.Active}
            >
              Active
            </option>

            <option
              value={FilterType.Completed}
            >
              Completed
            </option>
          </select>
        </form>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {visibleTodos.map(todo => (
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
                    this.props.updateUserId(todo.userId);
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
