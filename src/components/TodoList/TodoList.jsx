import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    title: '',
    select: 'All',
  }

  onChangeInput = (event) => {
    this.setState({
      title: event.target.value,
    });
  }

  onChangeSelect = (event) => {
    this.setState({
      select: event.target.value,
    });
  }

  filterTodos = todos => (
    this.state.title.length > 0
      ? todos.filter(
        (todo) => {
          if (todo.title === null) {
            return false;
          }

          return todo.title.toLowerCase()
            .includes(this.state.title.toLowerCase());
        },
      )
      : todos
  )

  render() {
    const { selectedTodo, selectedTodoId } = this.props;

    let filteredTodos = this.filterTodos(this.props.todos);

    if (this.state.select !== 'All') {
      filteredTodos = filteredTodos.filter(todo => (
        this.state.select === 'Completed'
          ? todo.completed
          : !todo.completed
      ));
    }

    return (
      <div className="TodoList">
        <input
          type="text"
          placeholder="What are you looking for?"
          value={this.state.title}
          onChange={this.onChangeInput}
        />
        <select
          name="select"
          id="select"
          onChange={this.onChangeSelect}
        >
          <option
            value="All"
          >
            All
          </option>
          <option
            value="Completed"
          >
            Completed
          </option>
          <option
            value="Active"
          >
            Active
          </option>
        </select>

        <h2>Todos:</h2>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <li
                key={todo.id}
                className={classNames(
                  'TodoList__item',
                  (todo.completed
                    ? 'TodoList__item--unchecked'
                    : 'TodoList__item--checked'
                  ),
                )}
              >
                <label>
                  <input type="checkbox" readOnly />
                  <p>{todo.title}</p>
                </label>

                {selectedTodoId === todo.userId ? (
                  <button
                    className="
                      TodoList__user-button
                      button
                      TodoList__user-button--selected
                    "
                    type="button"
                    onClick={() => {
                      selectedTodo(0);
                    }}
                  >
                    User&nbsp;
                    {`#${todo.userId}`}
                  </button>
                ) : (
                  <button
                    className="
                      TodoList__user-button
                      button
                      TodoList__user-button--unselected
                    "
                    type="button"
                    onClick={() => {
                      selectedTodo(todo.userId);
                    }}
                  >
                    User&nbsp;
                    {`#${todo.userId}`}
                  </button>
                )}
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
      userId: PropTypes.number,
      id: PropTypes.number,
      title: PropTypes.string,
      completed: PropTypes.bool,
    }),
  ).isRequired,
  selectedTodo: PropTypes.func.isRequired,
  selectedTodoId: PropTypes.number.isRequired,
};
