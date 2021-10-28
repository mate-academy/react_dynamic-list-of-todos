import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

type Props = {
  todos: Todo[],
  selectUser: (userId: number) => void,
  randomSort: () => void,
};

type State = {
  query: string,
  selectedValue: string,
};

export class TodoList extends React.Component<Props> {
  state: State = {
    query: '',
    selectedValue: '',
  };

  handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;

    this.setState({
      query: value,
    });
  };

  handleSelectChange = (event: React.FormEvent<HTMLSelectElement>) => {
    const { value } = event.target as HTMLSelectElement;

    this.setState({
      selectedValue: value,
    });
  };

  filterTodos = (todos: Todo[], selector: string) => {
    return todos.filter(todo => todo.title.toLowerCase().includes(selector));
  };

  selectTodos = (todos: Todo[], value: string) => {
    if (value === 'active') {
      return todos.filter(todo => todo.completed === false);
    }

    if (value === 'completed') {
      return todos.filter(todo => todo.completed === true);
    }

    return todos;
  };

  render() {
    const { query, selectedValue } = this.state;
    const { selectUser, randomSort } = this.props;
    let { todos } = this.props;

    if (selectedValue) {
      todos = this.selectTodos(todos, selectedValue);
    }

    if (query) {
      todos = this.filterTodos(todos, query);
    }

    return (
      <>
        <form
          action=""
          className="form"
        >
          <input
            type="text"
            value={query}
            placeholder="Search by title"
            onChange={this.handleInputChange}
            className="input"
          />

          <select
            value={selectedValue}
            onChange={this.handleSelectChange}
            className="select"
          >
            <option disabled>
              Sort todos
            </option>

            <option
              value="all"
            >
              all
            </option>

            <option
              value="active"
            >
              active
            </option>

            <option
              value="completed"
            >
              completed
            </option>
          </select>

          <button
            type="button"
            onClick={randomSort}
            className="randomizer"
          >
            Randomize
          </button>
        </form>
        <div className="TodoList">
          <h2>Todos:</h2>

          <div className="TodoList__list-container">
            <ul className="TodoList__list">
              {todos.map((todo: Todo) => (
                <li
                  key={todo.id}
                  className={classNames('TodoList__item', { 'TodoList__item--unchecked': todo.completed === false }, { 'TodoList__item--checked': todo.completed === true })}
                >
                  <label htmlFor="todo">
                    <input
                      type="checkbox"
                      checked={todo.completed === true}
                      readOnly
                      id="todo"
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
                    onClick={() => (
                      selectUser(todo.userId)
                    )}
                  >
                    User&nbsp;
                    {todo.userId}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    );
  }
}
