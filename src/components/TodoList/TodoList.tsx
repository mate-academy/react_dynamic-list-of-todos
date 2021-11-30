import classNames from 'classnames';
import React from 'react';
import { Requirement } from '../../enums/Requirement';
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
  todoRequirement: Requirement;
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    titleQuery: '',
    todoRequirement: Requirement.ALL,
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

    const meetRequirement = (todo: Todo) => {
      switch (this.state.todoRequirement) {
        case Requirement.ACTIVE:
          return !todo.completed;

        case Requirement.COMPLETED:
          return todo.completed;

        default:
          return true;
      }
    };

    return todos.filter(
      (todo) => todo.title.includes(titleQuery) && meetRequirement(todo),
    );
  };

  render() {
    const { todos, selectedUserId, onSelect } = this.props;
    const { titleQuery, todoRequirement } = this.state;

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
            name="todoRequirement"
            value={todoRequirement}
            onChange={this.handleChange}
            id="todoRequirement"
          >
            <option value={Requirement.ALL}>All</option>
            <option value={Requirement.ACTIVE}>Not completed</option>
            <option value={Requirement.COMPLETED}>Completed</option>
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
                    <input type="checkbox" checked={todo.completed} readOnly />
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
