import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    inputValue: '',
    optionValue: 'all',
    todos: [],
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.todos.length !== this.props.todos.length) {
      this.setTodos([...this.props.todos]);
    }

    if (prevState.inputValue !== this.state.inputValue) {
      if (this.state.inputValue !== '') {
        const filteredList = [...this.props.todos]
          .filter((todo) => {
            if (todo.title === null) {
              return false;
            }

            return todo.title.includes(this.state.inputValue);
          });

        this.setTodos(filteredList);
      }

      if (this.state.inputValue === '' || this.state.inputValue === undefined) {
        this.setTodos([...this.props.todos]);
      }
    }
  }

  setTodos = (todosList) => {
    this.setState({ todos: todosList });
  }

  listFilter = (event) => {
    if (this.state.optionValue !== event.target.value) {
      switch (event.target.value) {
        case 'all':
          this.setState({
            todos: [...this.props.todos],
            optionValue: 'all',
          });
          break;
        case 'active':
          this.setState({
            todos: this.props.todos.filter(todo => !todo.completed),
            optionValue: 'active',
          });
          break;
        case 'completed':
          this.setState({
            todos: this.props.todos.filter(todo => todo.completed),
            optionValue: 'completed',
          });
          break;

        default:
          break;
      }
    }
  }

  inputHandler = (event) => {
    this.setState({ inputValue: event.target.value });
  }

  selectHandler = (event) => {
    this.setState({ optionValue: event.target.value });
  }

  render() {
    const { todos, inputValue } = this.state;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <input
            type="text"
            value={inputValue}
            onChange={this.inputHandler}
          />
          <select
            onClick={this.listFilter}
          >
            <option
              value="all"
            >
              All
            </option>
            <option
              value="active"
            >
              Active
            </option>
            <option
              value="completed"
            >
              Completed
            </option>
          </select>
          <ul className="TodoList__list">
            {todos.map(todo => (
              <li
                key={todo.id}
                className={
                  classNames(
                    'TodoList__item',
                    { 'TodoList__item--unchecked': !todo.completed },
                    { 'TodoList__item--checked': todo.completed },
                  )
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
                  onClick={() => this.props.chooseUser(todo.userId)}
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
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  chooseUser: PropTypes.func.isRequired,
};
