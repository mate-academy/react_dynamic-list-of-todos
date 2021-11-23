import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

type Props = {
  todos: Todo[]
  selectUser: (userId: number) => void,
  selectedUserId: number
};

interface State {
  title: string,
  sortBy: string,
}

type EventType = React.ChangeEvent<
HTMLInputElement | HTMLSelectElement
>;

export class TodoList extends React.Component<Props, State> {
  state: State = {
    title: '',
    sortBy: '',
  };

  handleChange = (event: EventType) => {
    const { name, value } = event.target;

    this.setState((state) => (
      {
        ...state,
        [name]: value,
      }
    ));
  };

  getSortedBySelected = (todos: Todo[]) => {
    switch (this.state.sortBy) {
      case 'complited':
        return todos.filter(todo => todo.completed);

      case 'active':
        return todos.filter(todo => !todo.completed);

      default:
        return todos;
    }
  };

  getSearchTodos = (todos: Todo[]) => {
    const { title } = this.state;

    if (title) {
      return todos.filter(todo => todo.title.toLowerCase().includes(title.toLowerCase()));
    }

    return todos;
  };

  render() {
    const { todos } = this.props;
    const todosByStatus = this.getSortedBySelected(todos);
    const todosByInput = this.getSearchTodos(todosByStatus);

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <input
            type="text"
            name="title"
            id="sortByText"
            placeholder="Find a todo"
            value={this.state.title}
            onChange={this.handleChange}
          />

          <select
            name="sortBy"
            id="sortBySelect"
            value={this.state.sortBy}
            onChange={this.handleChange}
          >
            <option value="all">
              Show all
            </option>
            <option value="complited">
              Complited
            </option>
            <option value="active">
              Active
            </option>
          </select>

          <ul className="TodoList__list">
            {todosByInput.map((todo) => (
              <li
                key={todo.id}
                className={classNames('TodoList__item',
                  { 'TodoList__item--unchecked': !todo.completed },
                  { 'TodoList__item--checked': todo.completed })}
              >
                <>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
                <label>
                  <input type="checkbox" readOnly />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classNames('TodoList__user-button', 'button',
                    { 'TodoList__user-button--selected ': todo.userId === this.props.selectedUserId })}
                  type="button"
                  onClick={() => this.props.selectUser(todo.userId)}
                >
                  {`User: ${todo.userId}`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
