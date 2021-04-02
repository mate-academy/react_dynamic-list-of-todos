import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    todos: this.props.todos,
  }

  filterTitle = (event) => {
    const { value } = event.target;
    console.log(this.state.todos)
    console.log(value)
    // this.setState({
    //   todos: this.props.todos
    //     .filter(todo => todo.title.includes(value)),
    // });
  }

  render() {
    const { selectUser } = this.props;
    const { todos } = this.state;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div>
          <input
            placeholder="Filter"
            onChange={this.filterTitle}
          />
        </div>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todos.map(todo => (
              <li
                key={todo.id}
                className={classNames('TodoList__item',
                  { 'TodoList__item--unchecked': !todo.completed },
                  { 'TodoList__item--checked': todo.completed })}
              >
                <label>
                  <input type="checkbox" readOnly />
                  <p>{todo.title}</p>
                </label>

                <button
                  className="
                    TodoList__user-button
                    TodoList__user-button--selected
                    button
                  "
                  type="button"
                  onClick={() => {
                    selectUser(todo.userId);
                  }}
                >
                  User&nbsp;
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
  selectUser: PropTypes.func.isRequired,
};
