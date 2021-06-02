import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    titleFilter: '',
    sortTodos: 'all',
    random: false,
  }

  sortTodos = (todos) => {
    switch (this.state.sortTodos) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }

  shuffle = (todos) => {
    const result = [];
    let todosLength = todos.length;
    let index;

    while (todosLength) {
      // eslint-disable-next-line no-plusplus
      index = Math.floor(Math.random() * todosLength--);
      result.push(todos.splice(index, 1)[0]);
    }

    return result;
  }

  render() {
    const {
      selectedUser,
      selectUser,
      todos,
    } = this.props;

    const { titleFilter, sortTodos, random } = this.state;

    let preparedTodos = this.sortTodos([...todos]);

    if (random) {
      preparedTodos = this.shuffle(preparedTodos);
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <label htmlFor="filterByTitle">
          {`Filter todos by title `}
          <input
            className="sorting-input"
            type="text"
            placeholder="Enter a query"
            id="filterByTitle"
            value={titleFilter}
            onChange={(event) => {
              this.setState({ titleFilter: event.target.value });
            }}
          />
        </label>

        <select
          className="sorting-input"
          name="sortingTodos"
          id="sortingTodos"
          value={sortTodos}
          onChange={(event) => {
            this.setState({ sortTodos: event.target.value });
          }}
        >
          <option value="all">Show all todos</option>
          <option value="active">Show uncomplited todos</option>
          <option value="completed">Show complited todos</option>
        </select>

        <button
          type="button"
          className={classNames(
            'sorting-input',
            {
              'randomize-active': random,
              'randomize-inactive': !random,
            },
          )}
          onClick={() => {
            this.setState(state => (
              { random: !state.random }
            ));
          }}
        >
          Randomize
        </button>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {preparedTodos.map((todo) => {
              if (todo.title && todo.title.includes(titleFilter)) {
                return (
                  <li
                    className={classNames(
                      'TodoList__item',
                      {
                        'TodoList__item--checked': todo.completed,
                        'TodoList__item--unchecked': !todo.completed,
                      },
                    )}
                    key={todo.id}
                  >
                    <label>
                      <input
                        type="checkbox"
                        readOnly
                        checked={todo.completed}
                      />
                      <p>{todo.title}</p>
                    </label>

                    <button
                      className={classNames(
                        'TodoList__user-button', 'button',
                        { 'TodoList__user-button--selected':
                          selectedUser === todo.userId },
                      )}
                      type="button"
                      onClick={() => {
                        selectUser(todo.userId);
                      }}
                    >
                      {todo.userId ? (
                        <>
                          User&nbsp;#
                          {todo.userId}
                        </>
                      ) : (
                        <>
                          not assigned
                        </>
                      )}
                    </button>
                  </li>
                );
              }

              return null;
            })}
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
      title: PropTypes.string,
      completed: PropTypes.bool,
      userId: PropTypes.number,
    }),
  ),
  selectedUser: PropTypes.number,
  selectUser: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  todos: [],
  selectedUser: 0,
};
