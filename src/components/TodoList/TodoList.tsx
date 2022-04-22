import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import { getAllTodos } from '../../api';

type Props = {
  selectUser: (userId: number) => void,
  userId: number,
};
type State = {
  todos: Todo[],
  input: string,
  select: string,
};

export class TodoList extends React.Component <Props, State> {
  state: State = {
    todos: [],
    input: '',
    select: '',
  };

  async componentDidMount() {
    const todosFromServer = await getAllTodos();

    this.setState({
      todos: todosFromServer,
    });
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({
      input: value,
    });
  };

  handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    this.setState({
      select: value,
    });
  };

  getPreparedTodos = () => {
    const { todos, input, select } = this.state;
    const inputCase = input.toLowerCase();

    let preparedTodos = [...todos];

    if (input) {
      preparedTodos = todos.filter(todo => todo.title.toLowerCase().includes(inputCase));
    }

    switch (select) {
      case 'completed':
        return preparedTodos.filter(todo => todo.completed);
      case 'not':
        return preparedTodos.filter(todo => !todo.completed);
      default:
        return preparedTodos;
    }
  };

  render() {
    const { input, select } = this.state;
    const preparedTodos = this.getPreparedTodos();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <label htmlFor="input" data-cy="filterByTitle">
          Filter by Title:
          {' '}
          <input
            type="text"
            name="input"
            id="input"
            value={input}
            onChange={this.handleChange}
          />
          {'  '}
          <select
            name="select"
            value={select}
            onChange={this.handleSelectChange}
          >
            <option value="all">all</option>
            <option value="completed">completed</option>
            <option value="not">active</option>
          </select>
        </label>
        <div className="TodoList__list-container">
          <ul className="TodoList__list" data-cy="listOfTodos">
            {preparedTodos.map(todo => (
              <li
                className={classNames('TodoList__item', {
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': todo.completed,
                })}
                key={todo.id}
              >
                <label htmlFor={`${todo.id}`}>
                  <input
                    type="checkbox"
                    id={`${todo.id}`}
                    checked={todo.completed}

                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classNames(
                    'TodoList__user-button',
                    'button',
                    { 'TodoList__user- button--selected': todo.userId === this.props.userId },
                  )}
                  data-cy="listOfTodos"
                  type="button"
                  onClick={() => this.props.selectUser(todo.userId)}
                >
                  User #
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
