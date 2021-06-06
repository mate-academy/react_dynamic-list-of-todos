import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    query: '',
    type: '',
  }

  render() {
    const { todos, onUserIdSelected, selectedUserId } = this.props;
    const { query, type } = this.state;
    const typeOptions = ['all', 'active', 'completed'];
    const searchPhrase = query.toLocaleLowerCase();

    const filteredTodosList = todos
      .filter(todo => todo.title)
      .filter(todo => todo.title.toLocaleLowerCase().includes(searchPhrase))
      .filter((todo) => {
        switch (type) {
          case 'active':
            return todo.completed !== true;
          case 'completed':
            return todo.completed === true;
          default:
            return true;
        }
      });

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div className="filter">
          <input
            type="text"
            value={query}
            onChange={(event) => {
              this.setState({ query: event.target.value });
            }}
          />
          <select
            id="status"
            className="filter-field"
            value={type}
            onChange={(event) => {
              this.setState({ type: event.target.value });
            }}
          >
            <option>select status for todos</option>
            {typeOptions.map(item => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodosList.map(todo => (
              <li
                key={todo.id}
                className={classnames({
                  TodoList__item: true,
                  'TodoList__item--checked': todo.completed,
                  'TodoList__item--unchecked': !todo.completed,
                })}
              >
                <label>
                  <input type="checkbox" checked={todo.completed} readOnly />
                  <p>{todo.title}</p>
                </label>

                {todo.userId && (
                  <button
                    type="button"
                    className={classnames({
                      button: true,
                      'TodoList__user-button': true,
                      'TodoList__user-button--selected':
                        selectedUserId === todo.userId,
                    })}
                    onClick={() => {
                      onUserIdSelected(todo.userId);
                    }}
                  >
                    User&nbsp;
                    {todo.userId}
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
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
  })),
  onUserIdSelected: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number,
};

TodoList.defaultProps = {
  todos: [],
  selectedUserId: 0,
};
