import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

export class TodoList extends React.PureComponent {
  state = {
    query: '',
  }

  render() {
    const { todos, callback, active, completed, all } = this.props;
    const todosWithoutNull = todos.filter(todo => todo.title !== null);
    const filteredTodos = todosWithoutNull
      .filter(todo => todo.title.startsWith(this.state.query));

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <select name="sort" className="select">
          <option onClick={all}>Show all</option>
          <option onClick={completed}>Show completed</option>
          <option onClick={active}>Show active</option>
        </select>

        <input
          type="text"
          placeholder="Type todo title"
          value={this.state.query}
          onChange={(event) => {
            this.setState({ query: event.target.value });
          }}
        />

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(todo => !!todo.title && todo.userId && (
            <li
              key={todo.id}
                  // eslint-disable-next-line max-len
              className={`${'TodoList__item'} TodoList__item${todo.completed ? '--checked' : '--unchecked'}`}
            >
              <label>
                <input type="checkbox" checked={todo.completed} readOnly />
                <p>{todo.title}</p>
              </label>

              <button
                className="
                  TodoList__user-button
                  button
                "
                type="button"
                onClick={callback}
              >
                User&nbsp;
                {`#${todo.userId}`}
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
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  })).isRequired,
  callback: PropTypes.func.isRequired,
  active: PropTypes.func.isRequired,
  completed: PropTypes.func.isRequired,
  all: PropTypes.func.isRequired,
};
