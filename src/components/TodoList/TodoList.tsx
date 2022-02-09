import React from 'react';
import classNames from 'classnames';

import './TodoList.scss';

import { getAllTodos } from '../../Api/api';

type Props = {
  selectedUserId: (id: number) => void;
  handleSelectorStatus: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectorStatus: number;
};

type State = {
  todos: Todo[];
  query: string;
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    todos: [],
    query: '',
  };

  async componentDidMount() {
    const todos = await getAllTodos();

    this.setState({ todos });
  }

  handleButtonFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      query: event.target.value,
    });
  };

  getFiltredTodos = (todos: Todo[], status: boolean) => {
    return todos.filter(todo => todo.completed === status);
  };

  getFilteredData = () => {
    const { todos, query } = this.state;
    const { selectorStatus } = this.props;

    if (query) {
      const filterTodos = todos.filter((todo) => {
        const lowerCaseQuery = query.toLowerCase();

        return (
          todo.title.toLowerCase().includes(lowerCaseQuery)
        );
      });

      if (selectorStatus === 1) {
        return this.getFiltredTodos(filterTodos, false);
      }

      if (selectorStatus === 2) {
        return this.getFiltredTodos(filterTodos, true);
      }

      return filterTodos;
    }

    switch (selectorStatus) {
      case 1:
        return this.getFiltredTodos(todos, false);
      case 2:
        return this.getFiltredTodos(todos, true);
      default:
        return todos;
    }
  };

  handleRandomizer = () => {
    const { todos } = this.state;
    const randomOrder = todos.sort(() => Math.random() - 0.5);

    this.setState({ todos: randomOrder });
  };

  render() {
    const { query } = this.state;
    const { handleSelectorStatus, selectedUserId, selectorStatus } = this.props;
    const filteredTodoList = this.getFilteredData();

    return (
      <div className="TodoList">
        <input
          type="text"
          id="search-query"
          className="input"
          placeholder="Type search word"
          value={query}
          onChange={this.handleButtonFilter}
        />

        <select
          className="select"
          value={selectorStatus}
          onChange={handleSelectorStatus}
        >
          <option value="0">all</option>
          <option className="select select--active" value="1">active</option>
          <option className="select select--completed" value="2">completed</option>
        </select>

        <button
          type="button"
          className="
            TodoList__user-button
            TodoList__user-button--selected
            button
          "
          onClick={this.handleRandomizer}
        >
          Randomize
        </button>

        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodoList.map(todo => (
              <li key={todo.id} className={classNames('TodoList__item', { 'TodoList__item--unchecked': !todo.completed }, { 'TodoList__item--checked': todo.completed })}>
                <label htmlFor={`Todo-${todo.id}`}>
                  <input
                    id={`Todo-${todo.id}`}
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
                  onClick={() => selectedUserId(todo.userId)}
                >
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
