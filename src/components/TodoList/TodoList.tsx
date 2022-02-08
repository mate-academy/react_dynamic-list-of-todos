import React from 'react';
import './TodoList.scss';

import 'bulma/css/bulma.css';

import classNames from 'classnames';
import { request } from '../../api';

type Props = {
  selectUser: (userId: number) => void,
  userId: number,
};

type State = {
  todos: Todo[],
  title: string,
  status: string,
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    todos: [],
    title: '',
    status: 'all',
  };

  async componentDidMount() {
    const todos = await request();

    this.setState({ todos });
  }

  getStatus = (status: string) => {
    switch (status) {
      case 'completed':
        return true;
      case 'active':
        return false;
      default:
        return 'all';
    }
  };

  changeTodoStatus = (id: number) => {
    const { todos } = this.state;

    const copy = [...todos].map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    this.setState(() => ({
      todos: copy,
    }));
  };

  filterTitle = (todo: Todo) => {
    const { status, title } = this.state;

    if (this.getStatus(status) === 'all') {
      return (todo.title.toLocaleLowerCase().includes(title.toLocaleLowerCase()));
    }

    return (todo.title.toLocaleLowerCase().includes(title.toLowerCase())
      && todo.completed === this.getStatus(status));
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    this.setState(state => ({
      ...state,
      [name]: value,
    }));
  };

  render() {
    const { todos, title, status } = this.state;
    const visibleTodos = todos.filter(this.filterTitle);

    return (
      <div className="TodoList">
        <input
          className="input is-primary"
          placeholder="Wrire a title"
          name="title"
          type="text"
          value={title}
          onChange={this.handleChange}
        />
        <div className="select is-primary">
          <select
            name="status"
            value={status}
            onChange={this.handleChange}
          >
            <option value="all">all</option>
            <option value="completed">completed</option>
            <option value="active">active</option>
          </select>
        </div>
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {visibleTodos.map(todo => (
              <li
                key={todo.id}
                className={classNames('TodoList__item', {
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': todo.completed,
                })}
              >
                <label htmlFor={`${todo.id}`}>
                  <input
                    type="checkbox"
                    id={`${todo.id}`}
                    checked={todo.completed}
                    onChange={() => this.changeTodoStatus(todo.id)}
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className="
                    TodoList__user-button
                    TodoList__user-button--selected
                    button
                "
                  type="button"
                  onClick={() => this.props.selectUser(todo.userId)}
                >
                  User&nbsp;#
                  {todo.userId}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
