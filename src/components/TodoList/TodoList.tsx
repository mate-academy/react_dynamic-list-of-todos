import classNames from 'classnames';
import React from 'react';
import './TodoList.scss';

interface Props {
  todos: Todo[],
  currentUser: number,
  selectedUserId: (userId: number) => void,
}
type State = {
  query: string,
  selected: string,
};

export class TodoList extends React.Component<Props, State> {
  state = {
    query: '',
    selected: '',
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  filterByTitle = () => {
    return this.props.todos.filter(todo => {
      return todo.title.toLowerCase().includes(this.state.query.toLowerCase());
    });
  };

  handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ selected: event.target.value });
  };

  filterBySelect = () => {
    if (this.state.selected === 'active') {
      return this.filterByTitle().filter(todo => todo.completed !== true);
    }

    if (this.state.selected === 'completed') {
      return this.filterByTitle().filter(todo => todo.completed === true);
    }

    return this.filterByTitle();
  };

  render() {
    const { currentUser, selectedUserId } = this.props;
    const { query } = this.state;

    const filteredTodos = this.filterBySelect();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <select
          value={this.state.selected}
          name="select"
          onChange={this.handleSelect}
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

        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={this.handleChange}
        />

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map((todo: Todo) => {
              const {
                id,
                userId,
                title,
                completed,
              } = todo;

              return (
                <li
                  key={id}
                  className={classNames('TodoList__item', {
                    'TodoList__item--checked': completed,
                    'TodoList__item--unchecked': !completed,
                  })}
                >
                  <label htmlFor="input">
                    <input
                      type="checkbox"
                      readOnly
                      id="input"
                      checked={completed}
                    />
                    <p>
                      {title}
                    </p>
                  </label>

                  <button
                    className={classNames('TodoList__user-button', 'button', {
                      'TodoList__user-button--selected': currentUser === userId,
                      'TodoList__user-button--unselected': currentUser !== userId,
                    })}
                    type="button"
                    onClick={() => {
                      selectedUserId(userId);
                    }}
                  >
                    {`User #${userId}`}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
