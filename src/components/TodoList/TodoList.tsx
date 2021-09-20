import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

interface Props {
  todos: Todo[],
  updatedUserId: (id: number) => void,
}

interface State {
  title: string,
  status: string,
}

export class TodoList extends React.Component<Props, State> {
  state = {
    title: '',
    status: '',
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({ title: value });
  };

  filteredByTitle = () => {
    const { title } = this.state;
    const { todos } = this.props;

    const titleToLowerCase = title.toLowerCase();

    return todos.filter(item => (
      item.title.includes(titleToLowerCase)
    ));
  };

  selectOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    this.setState({ status: value });
  };

  filterBySelect = () => {
    const { status } = this.state;

    if (status === 'active') {
      return (
        this.filteredByTitle().filter(complete => (
          complete.completed !== true
        ))
      );
    }

    if (status === 'completed') {
      return (
        this.filteredByTitle().filter(complete => (
          complete.completed === true
        ))
      );
    }

    return this.filteredByTitle();
  };

  render() {
    const { updatedUserId } = this.props;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <input
          type="text"
          value={this.state.title}
          onChange={this.handleChange}
        />

        <select
          name="status"
          value={this.state.status}
          onChange={this.selectOption}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {this.filterBySelect().map(todo => (
              <li
                key={todo.id}
                className={
                  classNames('TodoList__item',
                    {
                      'TodoList__item--checked': todo.completed,
                      'TodoList__item--unchecked': !todo.completed,
                    })
                }
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
                  onClick={() => updatedUserId(todo.userId)}
                >
                  User&nbsp;
                  {todo.userId}
                </button>
              </li>
            ))}

            <li className="TodoList__item TodoList__item--checked">
              <label>
                <input type="checkbox" checked readOnly />
                <p>distinctio vitae autem nihil ut molestias quo</p>
              </label>

              <button
                className="TodoList__user-button button"
                type="button"
              >
                User&nbsp;#2
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
