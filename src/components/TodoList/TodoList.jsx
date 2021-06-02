import React from 'react';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    select: '',
    search: '',
  }

  render() {
    const { todos, userId, findUserId, filterUser, searchTodo } = this.props;
    const { select, search } = this.state;

    return (
      <div className="TodoList">
        <input
          value={search}
          placeholder="search Title"
          onChange={(event) => {
            this.setState({ search: event.target.value });
            searchTodo(event.target.value);
          }}
        />

        <select
          value={select}
          onChange={(event) => {
            this.setState({ select: event.target.value });
            filterUser(event.target.value);
          }}
        >
          <option
            value=""
          >
            select
          </option>

          <option
            value="all"
          >
            all
          </option>

          <option
            value="false"
          >
            active
          </option>

          <option
            value="true"
          >
            completed
          </option>
        </select>

        <h2>Todos:</h2>

        {todos.map(todo => (
          <div
            className="TodoList__list-container"
            key={todo.id}
          >
            <ul className="TodoList__list">
              <li
                className={`TodoList__item
                  ${todo.completed
                  ? 'TodoList__item--checked'
                  : 'TodoList__item--unchecked'
                  }
                `}
              >
                <label>
                  <input
                    type="checkbox"
                    readOnly
                    checked={
                      !!todo.completed
                    }
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={
                    `TodoList__user-button
                    ${todo.userId === userId
                      && 'TodoList__user-button--selected'
                    }
                    button`
                  }
                  type="button"
                  onClick={() => findUserId(todo.userId)}
                >
                  User&nbsp;
                  {todo.userId}
                </button>
              </li>
            </ul>
          </div>
        ))}
      </div>
    );
  }
}
