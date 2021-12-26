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

export class TodoList extends React.Component<Props, State> {
  state = {
    titleFilter: '',
    selected: 'all',
  };

  shuffle = () => {
    this.props.preparedTodos.sort(() => Math.random() - 0.5);
    this.forceUpdate();
  };

  reset = () => {
    this.setState({ selected: 'all', titleFilter: '' });
    this.props.preparedTodos.sort((a, b) => a.id - b.id);
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
            value={this.state.selected}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="active">Active</option>
          </select>

          <button
            type="button"
            onClick={this.shuffle}
          >
            shuffle
          </button>

          <button
            type="button"
            onClick={this.reset}
          >
            reset
          </button>

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
