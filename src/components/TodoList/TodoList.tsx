import classNames from 'classnames';
import React from 'react';
import './TodoList.scss';
import { getTodos } from '../../api/api';
import { Todo } from '../../types/types';

interface State {
  todos: Todo[];
  preparedTodos: Todo[];
  query: string;
  status: string;
}

type Props = {
  onSelect: (userId: number) => void;
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    todos: [],
    preparedTodos: [],
    query: '',
    status: '',
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({
      todos,
      preparedTodos: todos,
    });
  }

  changeHandlerTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;

    this.setState((prevState) => {
      return {
        ...prevState,
        title: value,
      };
    });

    this.filterTodos(value, this.state.status);
  };

  changeHandlerSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.currentTarget;

    this.setState((prevState) => {
      return {
        ...prevState,
        status: value,
      };
    });

    this.filterTodos(this.state.query, value);
  };

  filterTodos = (query: string, status: string) => {
    let { preparedTodos } = this.state;

    if (query) {
      preparedTodos = preparedTodos.filter(({ title }) => title
        .toLowerCase()
        .includes(query.toLowerCase()));
    }

    if (status) {
      preparedTodos = preparedTodos.filter(({ completed }) => {
        if (status === 'completed') {
          return completed;
        }

        if (status === 'not completed') {
          return !completed;
        }

        return true;
      });
    }

    this.setState({ preparedTodos });
  };

  render() {
    const { query, status, preparedTodos } = this.state;
    const { onSelect } = this.props;

    return (
      <div className="TodoList">
        <form>
          <input
            name="query"
            type="text"
            value={query}
            onChange={this.changeHandlerTitle}
          />

          <select
            name="status"
            value={status}
            onChange={this.changeHandlerSelect}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </form>

        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {preparedTodos.map(todo => {
              return (
                <li
                  className={classNames(
                    'TodoList__item',
                    { 'TodoList__item--unchecked': !todo.completed },
                  )}
                >
                  <label htmlFor="checkbox">
                    <input type="checkbox" checked={todo.completed} readOnly />
                    <p>{todo.title}</p>
                  </label>

                  <button
                    className="
                      TodoList__user-button
                      TodoList__user-button--selected
                      button
                    "
                    type="button"
                    onClick={() => onSelect(todo.userId)}
                  >
                    User&nbsp;#
                    {todo.userId}
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
