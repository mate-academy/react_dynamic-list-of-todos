import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

type Props = {
  todos: Todo[],
};

type State = {
  visibleTodos: Todo[],
  inputFilter: string,
};

export class TodoList extends React.Component <Props, State> {
  state = {
    visibleTodos: this.props.todos,
    inputFilter: '',
  };

  componentDidUpdate(prevProps: Props) {
    if (prevProps.todos !== this.props.todos) {
      this.getVisible();
    }
  }

  getVisible() {
    this.setState({ visibleTodos: this.props.todos });
  }

  handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    switch (value) {
      case ('active'):
        this.setState({
          visibleTodos: this.props.todos.filter(todo => !todo.completed),
        });
        break;

      case ('completed'):
        this.setState({
          visibleTodos: this.props.todos.filter(todo => todo.completed),
        });
        break;

      default:
        this.setState({
          visibleTodos: this.props.todos,
        });
        break;
    }
  };

  render() {
    const { visibleTodos, inputFilter } = this.state;

    const filtredTodos = visibleTodos.filter(todo => (
      todo.title.toLowerCase().includes(inputFilter.toLowerCase())));

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <form className="TodoList__form">
          <input
            type="text"
            value={inputFilter}
            placeholder="Search"
            onChange={event => (
              this.setState({ inputFilter: event.target.value })
            )}
          />
          <select
            className="TodoList__select"
            onChange={this.handleSelectChange}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </form>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">

            {filtredTodos.map(todo => {
              const {
                id, title, userId, completed,
              } = todo;

              return (
                <li
                  key={id}
                  className={classNames('TodoList__item', `TodoList__item--${
                    completed ? 'checked' : 'unchecked'
                  }`)}
                >
                  <label>
                    <input
                      type="checkbox"
                      readOnly
                      checked={completed}
                    />
                    <p>{title}</p>
                  </label>

                  <button
                    className="TodoList__user-button button"
                    type="button"
                  >
                    {`User #${userId}`}
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
