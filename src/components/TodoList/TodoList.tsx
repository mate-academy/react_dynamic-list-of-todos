import React from 'react';
import classnames from 'classnames';
import './TodoList.scss';

type Props = {
  todos: Todo[];
  selectedUser: (userId: number) => void;
  selectedUserId: number;
};

type State = {
  searchQuery: string;
  filtered: number;
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    searchQuery: '',
    filtered: 0,
  };

  render() {
    const {
      searchQuery,
      filtered,
    } = this.state;

    const {
      todos,
      selectedUser,
      selectedUserId,
    } = this.props;

    let visibleTodos = [...todos];

    if (filtered > 0) {
      visibleTodos = visibleTodos.filter(todo => {
        if (filtered === 1) {
          return todo.completed;
        }

        return !todo.completed;
      });
    }

    if (searchQuery) {
      visibleTodos = visibleTodos.filter(todo => todo.title.includes(searchQuery));
    }

    return (
      <div className="TodoList">
        <div className="TodoList__filter">
          <input
            type="text"
            placeholder="Search by title"
            value={searchQuery}
            onChange={event => this.setState({ searchQuery: event.currentTarget.value })}
          />
          <label htmlFor="completed">
            {'Select todos status: '}
            <select
              name="select"
              id="completed"
              onChange={event => (this.setState({ filtered: Number(event.currentTarget.value) }))}
            >
              <option value={0}>All</option>
              <option value={1}>Completed</option>
              <option value={2}>Active</option>
            </select>
          </label>
        </div>

        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {visibleTodos.map(todo => {
              return (
                <li
                  key={todo.id}
                  className={
                    classnames('TodoList__item',
                      {
                        'TodoList__item--unchecked': !todo.completed,
                        'TodoList__item--checked': todo.completed,
                      })
                  }
                >
                  <label htmlFor="userId">
                    <input
                      id="userId"
                      type="checkbox"
                      checked={todo.completed}
                      readOnly
                    />
                    <p>{todo.title}</p>
                  </label>

                  <button
                    className={
                      classnames(
                        'TodoList__user-button',
                        'button',
                        { 'TodoList__user-button--selected': todo.userId === selectedUserId },
                      )
                    }
                    type="button"
                    onClick={() => selectedUser(todo.userId)}
                  >
                    User&nbsp;#
                    {todo.userId}
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
