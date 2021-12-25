/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

type Props = {
  preparedTodos: Todo[];
  selectUser: (id: number | null) => void;
  selectedUserId: number | null;
};

type State = {
  titleFilter: string,
  selected: string,
};

export class TodoList extends React.PureComponent<Props, State> {
  state = {
    titleFilter: '',
    selected: 'all',
  };

  render() {
    const { selectedUserId, preparedTodos, selectUser } = this.props;
    const { titleFilter, selected } = this.state;

    const filteredTodos = preparedTodos.filter(
      (todo) => todo.title.toLowerCase().includes(titleFilter.toLowerCase()) && (
        selected === 'completed' ? (
          todo.completed === true
        ) : (
          todo.completed === false
        )
        || selected === 'all'
      ),
    );

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div className="TodoList__list-container">
          <input
            type="text"
            name="titleFilter"
            value={this.state.titleFilter}
            onChange={(event) => this.setState({ titleFilter: event.target.value })}
          />

          <select
            name="selected"
            onChange={(event) => this.setState({ selected: event.target.value })}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="active">Active</option>
          </select>

          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <li
                className={
                  classNames('TodoList__item',
                    { 'TodoList__item--unchecked': !todo.completed })
                }
                key={todo.id}
              >
                <label>
                  <input type="checkbox" readOnly checked={todo.completed} />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={
                    classNames('TodoList__user-button', 'button',
                      { 'TodoList__user-button--selected': todo.userId === selectedUserId })
                  }
                  onClick={() => selectUser(todo.userId)}
                  type="button"
                >
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
