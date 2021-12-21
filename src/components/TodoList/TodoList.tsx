import React from 'react';
import './TodoList.scss';

type Props = {
  todos: Todo[],
  selectedUserId: number,
  selectedUser: (id: number) => void
};

type State = {
  visibleTodos: Todo[],
  query: string;
};

export class TodoList extends React.Component<Props, State> {
  state = {
    visibleTodos: this.props.todos,
    query: '',
  };

  componentDidUpdate(prevProps: Props) {
    if (prevProps.todos !== this.props.todos) {
      this.getVisible();
    }
  }

  getVisible() {
    this.setState({ visibleTodos: this.props.todos });
  }

  handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    switch (value) {
      case ('active'):
        this.setState(({
          visibleTodos: this.props.todos.filter(todo => !todo.completed),
        }));
        break;
      case ('completed'):
        this.setState(({
          visibleTodos: this.props.todos.filter(todo => todo.completed),
        }));
        break;
      default:
        this.setState({ visibleTodos: this.props.todos });
    }
  };

  filterList = () => {
    return (
      this.state.visibleTodos.filter(todo => (
        todo.title.toLowerCase().includes(this.state.query.toLowerCase())
      ))
    );
  };

  render() {
    const { query } = this.state;
    const searchedTodos = this.filterList();

    return (
      <div className="TodoList">
        <h2>
          Todos:
        </h2>
        <div className="TodoList__search">
          <span>
            Filter Todos By Title:
          </span>
          <div className="TodoList__form">
            <input
              className="TodoList__input"
              type="text"
              placeholder="enter title to search"
              value={query}
              onChange={event => this.setState({ query: event.target.value })}
            />

            <select
              className="TodoList__input"
              onChange={this.handleSelectChange}
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
          </div>
        </div>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {searchedTodos.map(todo => {
              return (
                <li
                  key={todo.id}
                  className={todo.completed
                    ? 'TodoList__item TodoList__item--checked'
                    : 'TodoList__item TodoList__item--unchecked'}
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    readOnly
                  />

                  <p>
                    {todo.title}
                  </p>

                  <button
                    className={todo.userId === this.props.selectedUserId
                      ? 'TodoList__user-button--selected button'
                      : 'TodoList__user-button button'}
                    type="button"
                    onClick={() => this.props.selectedUser(todo.userId)}
                  >
                    {`User #${todo.userId}`}
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
