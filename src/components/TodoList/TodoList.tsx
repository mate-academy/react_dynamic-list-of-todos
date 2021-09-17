import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

type Props = {
  onUserSelection: (userId: number) => void,
  todos: Todo[],
};

type State = {
  query: string,
  filterBy: string,
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    filterBy: 'all',
    query: '',
  };

  getVisibleTodos = () => {
    const { query, filterBy } = this.state;
    const { todos } = this.props;

    let visibleTodos = todos;

    if (query) {
      visibleTodos = todos
        .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
    }

    if (filterBy) {
      switch (filterBy) {
        case 'active':
          return visibleTodos.filter(todo => todo.completed === false);

        case 'completed':
          return visibleTodos.filter(todo => todo.completed === true);

        default:
          visibleTodos = todos;
      }
    }

    return visibleTodos;
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      query: event.target.value,
    });
  };

  handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      filterBy: event.currentTarget.value,
    });
  };

  render() {
    const { onUserSelection } = this.props;
    const { query } = this.state;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <input
          type="text"
          value={query}
          onChange={this.handleChange}
        />

        <select onChange={this.handleSelect}>
          <option value="all">all</option>
          <option value="active">active</option>
          <option value="completed">completed</option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {this.getVisibleTodos().map(todo => (
              <li
                className={classNames(
                  'TodoList__item',
                  {
                    'TodoList__item--unchecked': !todo.completed,
                    'TodoList__item--checked': todo.completed,
                  },
                )}
                key={todo.id}
              >
                <label>
                  <input
                    type="checkbox"
                    readOnly
                    checked={todo.completed}
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
