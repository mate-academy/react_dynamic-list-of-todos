import React from 'react';
import './TodoList.scss';
import cn from 'classnames';
import { Todo } from '../../types/type';

interface Props {
  todos: Todo[];
  selectUser: (id: number) => void;
  selectedUserId: number;
}

interface State {
  title: string;
  status: string;
}

export class TodoList extends React.Component<Props, State> {
  state = {
    title: '',
    status: 'all',
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    this.setState({ [name]: value } as unknown as Pick<State, keyof State>);
  };

  todosFilter() {
    const { title, status } = this.state;
    const query = title.toLowerCase();

    const todosfiltered = this.props.todos.filter(todo => todo.title.toLowerCase().includes(query));

    if (status === 'active') {
      return todosfiltered.filter(todo => !todo.completed);
    }

    if (status === 'completed') {
      return todosfiltered.filter(todo => todo.completed);
    }

    return todosfiltered;
  }

  render() {
    return (
      <div className="TodoList">

        <h2>Todos: </h2>
        <form
          className="form"
          action="GET"
        >
          <input
            type="text"
            name="title"
            className="form__input"
            placeholder="Enter task title"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <select
            name="status"
            className="form__select"
            value={this.state.status}
            onChange={this.handleChange}
          >
            <option
              value="all"
            >
              All
            </option>

            <option
              value="active"
            >
              Active
            </option>

            <option
              value="completed"
            >
              Completed
            </option>

          </select>
        </form>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {this.todosFilter().map((todo) => {
              const isActive = this.props.selectedUserId === todo.userId;

              return (
                <li
                  className={
                    cn('TodoList__item', {
                      'TodoList__item--checked': todo.completed,
                      'TodoList__item--unchecked': !todo.completed,
                    })
                  }
                >
                  <label htmlFor="input">
                    <input
                      type="checkbox"
                      id="input"
                      checked={todo.completed}
                      readOnly
                    />
                    <p>{todo.title}</p>
                  </label>

                  <button
                    className={cn(
                      'TodoList__user-button',
                      'button',
                      { 'TodoList__user-button--selected': isActive },
                    )}
                    type="button"
                    onClick={() => this.props.selectUser(todo.userId)}
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
