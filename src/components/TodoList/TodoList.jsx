import React from 'react';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    filterTodos: [],
    select: 'all',
    search: '',
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.todos !== this.props.todos) {
      this.setState({ filterTodos: this.props.todos })
    }
  }

  render() {
    const { todos, userId, findUserId } = this.props;
    const { filterTodos, select, search } = this.state;

    return (
      <div className="TodoList">
        <input
          value={search}
          placeholder="search Title"
          onChange={(event) => {
            const filter = todos.filter(todo => todo.title !== null && todo.title !== '');
            let find = '';

            select === 'all'
              ? find = filter.filter(todo => todo.title.includes(event.target.value))
              : find = filter.filter(todo => (
                  todo.completed === (select === 'active' ? false : true) && (
                    todo.title.includes(event.target.value))
                ))

            this.setState({
              search: event.target.value,
              filterTodos: find,
            });
          }}
        />

        <select
          value={select}
          onChange={(event) => {
            this.setState({ select: event.target.value });
            if (event.target.value === 'completed') {
              const active = todos.filter(todo => todo.completed === true)
              this.setState({ filterTodos: active })
            } else if (event.target.value === 'active') {
              const complete = todos.filter(todo => todo.completed === false)
              this.setState({ filterTodos: complete })
            } else {
              this.setState({ filterTodos: todos })
            }
          }}
        >
          <option
            value="all"
          >
            all
          </option>

          <option
            value="active"
          >
            active
          </option>

          <option
            value="completed"
          >
            completed
          </option>
        </select>

        <h2>Todos:</h2>

        {filterTodos.map(todo => (
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
