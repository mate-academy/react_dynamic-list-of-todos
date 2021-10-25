/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { getTodos } from '../../api/api';
import './TodoList.scss';

type Props = {
  selectedUser:(userId: number) => void;
};

type State = {
  todos: Todo[],
  query: string,
  selectedTitle: string
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    todos: [],
    query: '',
    selectedTitle: '',
  };

  componentDidMount() {
    getTodos()
      .then(todos => {
        this.setState({ todos });
      });
  }

  getFilterTodos = (): Todo[] => {
    const { query, todos } = this.state;

    const filteredTodos = todos.filter(
      todo => (todo.title.toLowerCase().includes(query.toLowerCase())),
    );

    return filteredTodos;
  };

  getFilteredSelections = () => {
    const { selectedTitle } = this.state;

    if (selectedTitle === 'active') {
      return (
        this.getFilterTodos().filter(todo => (
          todo.completed !== true
        ))
      );
    }

    if (selectedTitle === 'completed') {
      return (
        this.getFilterTodos().filter(todo => (
          todo.completed === true
        ))
      );
    }

    return this.getFilterTodos();
  };

  render() {
    const { query, selectedTitle } = this.state;
    const filteredTodos = this.getFilteredSelections();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <input
          placeholder="Search"
          className="App__user-selector"
          type="text"
          value={query}
          onChange={event => {
            this.setState({
              query: event.target.value,
            });
          }}
        />

        <select
          className="App__user-selector"
          value={selectedTitle}
          onChange={event => {
            this.setState({
              selectedTitle: event.target.value,
            });
          }}
        >
          <option value="all">All users</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <li
                key={todo.id}
                className={todo.completed
                  ? 'TodoList__item TodoList__item--checked'
                  : 'TodoList__item TodoList__item--unchecked'}
              >
                <label>
                  <input
                    type="checkbox"
                    readOnly
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className="
                    TodoList__user-button
                    TodoList__user-button--selected
                    button"
                  type="button"
                  onClick={() => this.props.selectedUser(todo.userId)}
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

export default TodoList;
