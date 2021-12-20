import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

type Props = {
  todos: Todo[],
  selectedUserId: number,
  selectUser: (id: number) => void
};

type State = {
  visibleTodos: Todo[],
  searchQuery: string;
};

export class TodoList extends React.Component<Props, State> {
  state = {
    visibleTodos: this.props.todos,
    searchQuery: '',
  };

  componentDidUpdate(prevProps: Props) {
    if (prevProps.todos !== this.props.todos) {
      this.getVisible();
    }
  }

  getVisible() {
    this.setState({ visibleTodos: this.props.todos });
  }

  filterList = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
        break;
    }
  };

  render() {
    const { visibleTodos, searchQuery } = this.state;
    const { selectedUserId, selectUser } = this.props;

    const serchedTodos = visibleTodos.filter(todo => (
      todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    ));

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <form className="TodoList__form">
            <input
              className="TodoList__input TodoList__input--search"
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={event => this.setState({ searchQuery: event.target.value })}
            />
            <select
              className="TodoList__input TodoList__input--select"
              onChange={this.filterList}
            >
              <option value="all">all</option>
              <option value="active">active</option>
              <option value="completed">completed</option>
            </select>
          </form>

          <ul className="TodoList__list">
            {serchedTodos.map(todo => (
              <li
                key={todo.id}
                className={classNames(
                  'TodoList__item',
                  {
                    'TodoList__item--unchecked': !todo.completed,
                    'TodoList__item--checked': todo.completed,
                  },
                )}
              >
                <label htmlFor="checkbox">
                  <input
                    id="checkbox"
                    type="checkbox"
                    checked={todo.completed}
                    readOnly
                  />
                  <p>{todo.title}</p>
                </label>
                {!!todo.userId && (
                  <button
                    className={classNames(
                      'TodoList__user-button',
                      'button',
                      {
                        'TodoList__user-button--selected': todo.userId === selectedUserId,
                      },
                    )}
                    type="button"
                    onClick={() => selectUser(todo.userId)}
                  >
                    {`User #${todo.userId}`}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
