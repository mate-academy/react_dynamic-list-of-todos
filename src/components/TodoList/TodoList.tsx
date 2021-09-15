import React from 'react';
import classNames from 'classnames';
import { getTodos } from '../../api';

import './TodoList.scss';

interface Props {
  selectedUserId: number;
  changeUserId: (userId: number) => void;
}

interface State {
  todos: Todo[] | [];
  value: string;
  filterType: string;
}

export class TodoList extends React.Component<Props, State> {
  state: State = {
    todos: [],
    value: '',
    filterType: 'all',
  };

  componentDidMount() {
    getTodos()
      .then((items: Todo[]) => {
        this.setState({
          todos: items,
        });
      });
  }

  hundleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: event.target.value,
    });
  };

  filterActive = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      filterType: event.target.value,
    });
  };

  getFilteredTodos = () => {
    const { todos, value, filterType } = this.state;

    let filteredTodos = todos.filter((todo: Todo) => (
      todo.title
      && todo.title.toLowerCase()
        .includes(value.toLowerCase())
    ));

    filteredTodos = filteredTodos.filter(todo => {
      switch (filterType) {
        case 'active':
          return todo.completed === false;
        case 'completed':
          return todo.completed === true;
        case 'all':
        default:
          return todo;
      }
    });

    return filteredTodos;
  };

  render() {
    const { changeUserId, selectedUserId } = this.props;

    const filteredTodos: Todo[] | null = this.getFilteredTodos();

    return (
      <>
        {filteredTodos && (
          <div className="TodoList">
            <h2>Todos:</h2>

            <input
              className="TodoList__input"
              type="text"
              placeholder="Enter the name of the task"
              value={this.state.value}
              onChange={this.hundleChange}
            />

            <select
              onChange={this.filterActive}
              defaultValue=""
            >
              <option
                value=""
                disabled
              >
                Filter by completeness
              </option>
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

            <div className="TodoList__list-container">
              <ul className="TodoList__list">
                {filteredTodos.map(todo => (
                  <li
                    className={classNames('TodoList__item', {
                      'TodoList__item--unchecked': !todo.completed,
                      'TodoList__item--checked': todo.completed,
                    })}
                    key={todo.id}
                  >
                    <label>
                      <input type="checkbox" readOnly />
                      <p>{todo.title}</p>
                    </label>

                    <button
                      className={classNames('TodoList__user-button button', {
                        'TodoList__user-button--selected': todo.userId === selectedUserId,
                      })}
                      type="button"
                      onClick={() => changeUserId(todo.userId)}
                    >
                      {`User: ${todo.userId}`}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </>
    );
  }
}
