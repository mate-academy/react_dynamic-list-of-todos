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

  searchSelect = (value, content) => {
    const filter = this.props.todos.filter(todo => todo.title !== null && todo.title !== '');
    let find = '';

    value === 'all'
      ? find = filter.filter(todo => todo.title.includes(content))
      : find = filter.filter(todo => (
        todo.completed === (value === 'active' ? false : true) && (
          todo.title.includes(content))
      ))

    return find;
  }

  selectFind = (value) => {
    const { todos } = this.props;

    if (value === 'completed') {
      const active = todos.filter(todo => todo.completed)
      this.setState({ filterTodos: active })
    } else if (value === 'active') {
      const complete = todos.filter(todo => !todo.completed)
      this.setState({ filterTodos: complete })
    } else {
      this.setState({ filterTodos: todos })
    }
  }

  render() {
    const { userId, findUserId } = this.props;
    const { filterTodos, select, search } = this.state;

    return (
      <div className="TodoList">
        <input
          value={search}
          placeholder="search Title"
          onChange={(event) => {
            this.setState({
              search: event.target.value,
              filterTodos: this.searchSelect(select, event.target.value),
            });
          }}
        />

        <select
          value={select}
          onChange={(event) => {
            this.setState({ select: event.target.value });
            this.selectFind(event.target.value);
          }}
        >
          <option value="all">
            all
          </option>

          <option value="active">
            active
          </option>

          <option value="completed">
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
