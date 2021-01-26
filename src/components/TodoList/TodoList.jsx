import React from 'react';
import './TodoList.scss';
import PropsType from 'prop-types';

export class TodoList extends React.Component {
  state = {
    checked: false,
    query: '',
  }

  handleChange = () => {
    this.setState(prevState => ({
      checked: !prevState.checked,
    }));
  }

  findTask = (event) => {
    this.setState({ query: event.target.value });
    this.props.filter(event.target.value);
  }

  render() {
    const { todos, selectUser } = this.props;
    const { query } = this.state;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <input placeholder="Task" value={query} onChange={this.findTask} />
          <ul className="TodoList__list">
            {todos.map(todo => (
              <li
                className={`TodoList__item TodoList__item--${todo.completed
                  ? 'checked' : 'unchecked'}`}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    readOnly
                    onChange={() => {}}
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
                  onClick={() => selectUser(todo.userId)}
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

TodoList.propTypes = {
  todos: PropsType.shape().isRequired,
  selectUser: PropsType.number.isRequired,
  filter: PropsType.func.isRequired,
};
