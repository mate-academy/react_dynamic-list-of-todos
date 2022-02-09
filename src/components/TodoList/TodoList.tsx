import classnames from 'classnames';
import React from 'react';
import './TodoList.scss';

type Props = {
  todos: Todo[];
  selectUser: (userId: number) => void;
  selectedUserId: number;
};

type State = {
  query: string;
  completedFilter: number;
};

export class TodoList extends React.Component<Props, State> {
  state = {
    query: '',
    completedFilter: 0,
  };

  render() {
    const {
      query,
      completedFilter,
    } = this.state;

    let visibleTodos = [...this.props.todos];

    if (completedFilter > 0) {
      visibleTodos = visibleTodos.filter(todo => {
        if (completedFilter === 1) {
          return (todo.completed);
        }

        return !todo.completed;
      });
    }

    if (query) {
      visibleTodos = visibleTodos.filter(todo => todo.title.includes(query));
    }

    return (
      <div className="TodoList">
        <div className="TodoList__filters">
          <input
            placeholder="Search by title"
            id="query"
            type="text"
            value={query}
            onChange={event => this.setState({ query: event.target.value })}
          />
          <label htmlFor="completed">
            {'Select todos status: '}
            <select
              name="select"
              id="comleted"
              onChange={event => (this.setState({ completedFilter: +event.target.value }))}
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
                    classnames(
                      'TodoList__item',
                      {
                        'TodoList__item--unchecked': !todo.completed,
                        'TodoList__item--checked': todo.completed,
                      },
                    )
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
                        { 'TodoList__user-button--selected': todo.userId === this.props.selectedUserId },
                      )
                    }
                    type="button"
                    onClick={() => this.props.selectUser(todo.userId)}
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
