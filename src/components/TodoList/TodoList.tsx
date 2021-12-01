import classNames from 'classnames';
import React from 'react';
import { Status } from '../../enums/Status';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import './TodoList.scss';

type Props = {
  todos: Todo[];
  selectedUserId: User['id'];
  onSelect: (newSelectedUserId: User['id']) => void;
};

type State = {
  titleQuery: string;
  selectedStatus: Status;
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    titleQuery: '',
    selectedStatus: Status.ALL,
  };

  handleChange = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    } as Pick<State, 'titleQuery'>);
  };

  getVisibleTodos = () => {
    const { todos } = this.props;
    const { titleQuery } = this.state;

    const hasCorrectStatus = (todo: Todo) => {
      switch (this.state.selectedStatus) {
        case Status.ACTIVE:
          return !todo.completed;

        case Status.COMPLETED:
          return todo.completed;

        default:
          return true;
      }
    };

    return todos.filter(
      (todo) => todo.title.includes(titleQuery) && hasCorrectStatus(todo),
    );
  };

  render() {
    const { todos, selectedUserId, onSelect } = this.props;
    const { titleQuery, selectedStatus } = this.state;

    const visibleTodos = this.getVisibleTodos();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <input
            className="TodoList__search-query"
            type="text"
            name="titleQuery"
            value={titleQuery}
            placeholder="Search for todo..."
            onChange={this.handleChange}
          />

          <select
            name="selectedStatus"
            value={selectedStatus}
            onChange={this.handleChange}
            id="selectedStatus"
          >
            <option value={Status.ALL}>
              All
            </option>

            <option value={Status.ACTIVE}>
              Not completed
            </option>

            <option value={Status.COMPLETED}>
              Completed
            </option>
          </select>

          {todos && (
            <ul className="TodoList__list">
              {visibleTodos.map((todo) => (
                <li
                  key={todo.id}
                  className={classNames(
                    'TodoList__item',
                    {
                      'TodoList__item--checked': todo.completed,
                    },
                    { 'TodoList__item--unchecked': !todo.completed },
                  )}
                >
                  <label htmlFor="todoStatus">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      readOnly
                    />
                    <p>{todo.title}</p>
                  </label>

                  <button
                    className={classNames('TodoList__user-button button', {
                      'TodoList__user-button--selected':
                        todo.userId === selectedUserId,
                    })}
                    type="button"
                    onClick={() => onSelect(todo.userId)}
                  >
                    User&nbsp;#
                    {todo.userId}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}
