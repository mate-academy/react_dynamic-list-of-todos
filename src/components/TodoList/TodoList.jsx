import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export class TodoList extends React.PureComponent {
  state = {
    filterByTitleCondition: '',
    filterByStatusCondition: 'all',
  }

  onChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const {
      todos,
      selectedUserId,
      onClick,
    } = this.props;

    const {
      filterByTitleCondition,
      filterByStatusCondition,
    } = this.state;

    const preparedTodos = todos
      .filter((todo) => {
        const title = todo.title.toLowerCase();

        return (title.includes(filterByTitleCondition));
      })
      .filter((todo) => {
        switch (filterByStatusCondition) {
          case 'all':
            return true;
          case 'active':
            return !todo.completed;
          case 'completed':
            return todo.completed;
          default:
            return true;
        }
      });

    return (
      <div className="TodoList">
        <h2>
          {`Todos: ${preparedTodos.length}`}
        </h2>
        <div className="search-form">
          <label>
            Filter by title:&nbsp;
            <input
              type="text"
              name="filterByTitleCondition"
              className="search-form__search-title"
              onChange={this.onChange}
              value={filterByTitleCondition}
            />
          </label>
          <label>
            Show:&nbsp;
            <select
              name="filterByStatusCondition"
              onChange={this.onChange}
            >
              <option value="all">All</option>
              <option value="active">Not completed</option>
              <option value="completed">Completed</option>
            </select>
          </label>
        </div>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {preparedTodos.map(todo => (
              <li
                className={classNames(
                  'TodoList__item',
                  {
                    'TodoList__item--unchecked': !todo.completed,
                    'TodoList__item--checked': todo.completed,
                  },
                )}
                key={todo.id}
              >
                <label>
                  <input
                    type="checkbox"
                    defaultChecked={todo.completed}
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classNames(
                    'TodoList__user-button button',
                    {
                      'TodoList__user-button--selected':
                        todo.userId === selectedUserId,
                    },
                  )}
                  type="button"
                  onClick={() => onClick(todo.userId)}
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
};

TodoList.defaultProps = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      completed: false,
      userId: 0,
    }),
  ),

};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
    }),
  ),
  selectedUserId: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
