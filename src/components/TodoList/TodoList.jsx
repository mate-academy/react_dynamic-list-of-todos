import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss'; //

export class TodoList extends React.PureComponent {
  state = {
    query: '',
    filterOption: 'all',
  }

  render() {
    const { todos, callback, selectedUserId } = this.props;
    const todosWithoutNull = todos.filter(todo => todo.title !== null);
    let filteredTodos = todosWithoutNull
      .filter(todo => todo.title.includes(this.state.query));

    // eslint-disable-next-line default-case
    switch (this.state.filterOption) {
      case 'completed':
        filteredTodos = filteredTodos.filter(todo => todo.completed === true);
        break;

      case 'active':
        filteredTodos = filteredTodos.filter(todo => todo.completed === false);
        break;
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <select
          name="sort"
          className="select"
          onChange={(event => (
            this.setState({ filterOption: event.target.value })
          ))}
        >
          <option value="all">Show all</option>
          <option value="completed">Show completed</option>
          <option value="active">Show active</option>
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
                className={
                  // eslint-disable-next-line max-len
                  `TodoList__user-button${todo.userId === selectedUserId ? '--selected' : ''} button`
                }
                type="button"
                onClick={() => {
                  callback(todo.userId);
                }}
                id={todo.userId}
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
  selectedUserId: PropTypes.number.isRequired,
};
