import React from 'react';
import classNames from 'classnames';

import './TodoList.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Props {
  todos: Todo[];
  handleUserSelection: (selectedUserId: number) => void;
}

interface State {
  query: string;
  filter: string;
  random: number;
}

export class TodoList extends React.Component<Props, State> {
  state: State = {
    query: '',
    filter: 'All',
    random: -1,
  };

  handleQuerier = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({ query: value });
  };

  handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    this.setState({ filter: value });
  };

  handleRandomize = () => {
    const randomNumber = Math.ceil(Math.random() * 100);

    this.setState({ random: randomNumber });
  };

  getFilteredTodos = () => {
    const { todos } = this.props;
    const { query, filter } = this.state;

    let filteredTodos = todos.filter(todo => (todo.title
      && todo.title.toLowerCase()
        .includes(query.toLowerCase())
    ));

    filteredTodos = [...filteredTodos].filter(todo => {
      switch (filter) {
        case 'Active':
          return todo.completed === false;
        case 'Completed':
          return todo.completed === true;
        case 'All':
        default:
          return todos;
      }
    });

    if (this.state.random > 0) {
      const getRandomSort = (arr: Todo[]) => {
        let randomNumber;
        let randomKey;

        for (let i = arr.length - 1; i > 0; i -= 1) {
          randomNumber = Math.floor(Math.random() * (i + 1));
          randomKey = arr[randomNumber];
          // eslint-disable-next-line no-param-reassign
          arr[randomNumber] = arr[i];
          // eslint-disable-next-line no-param-reassign
          arr[i] = randomKey;
        }

        return arr;
      };

      filteredTodos = getRandomSort([...filteredTodos]);
    }

    return filteredTodos;
  };

  render() {
    const { query, filter } = this.state;
    const { handleUserSelection } = this.props;
    const filteredTodos = this.getFilteredTodos();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div className="TodoList__form">
          <input
            type="text"
            name="query"
            value={query}
            className="TodoList__item"
            onChange={(this.handleQuerier)}
          />

          <button
            className="button"
            type="button"
            onClick={this.handleRandomize}
          >
            Randomize
          </button>

          <select
            name="filter"
            className="TodoList__item"
            value={filter}
            onChange={this.handleFilter}
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map((todo) => (
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
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    readOnly
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
                  onClick={() => handleUserSelection(todo.userId)}
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
