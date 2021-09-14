import classNames from 'classnames';
import React from 'react';
import { getTodos } from '../../api';
import './TodoList.scss';

interface State {
  todos: Todo[];
  query: string;
}

interface Props {
  chooseUser: (userId: number) => void;
}

export class TodoList extends React.Component<Props, State> {
  state: State = {
    todos: [],
    query: '',
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(_prevProps: Props, prevState: State) {
    if (prevState.query !== this.state.query) {
      this.loadData();
    }
  }

  searchByTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    event.preventDefault();
    this.setState({ query: value });
  };

  async loadData() {
    const { query } = this.state;
    const todos = await getTodos(query);

    this.setState({ todos });
  }

  render() {
    const { todos, query } = this.state;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <form>
          <label htmlFor="searchBiTitle">
            Search by title:
            <input
              type="text"
              value={query}
              id="searchBiTitle"
              onChange={this.searchByTitle}
            />
          </label>
        </form>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todos.map(todo => (
              <li
                className={classNames(
                  'TodoList__item',
                  {
                    'TodoList__item--unchecked': !todo.completed,
                    'TodoList__item--checked': todo.completed,
                  },
                )}
                key={todo.id}
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
                  onClick={(event) => {
                    event.preventDefault();
                    this.props.chooseUser(todo.userId);
                  }}
                >
                  {`User #${todo.userId}`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
