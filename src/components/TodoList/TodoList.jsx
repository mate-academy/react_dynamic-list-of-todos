import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';

export class TodoList extends React.Component {
  state = {
    queryTitle: '',
    conditionFilter: 'all',
  }

  setQueryTitle = (query) => {
    this.setState({
      queryTitle: query,
    });
  };

  setConditionFilter = (option) => {
    this.setState({
      conditionFilter: option,
    });
  };

  render() {
    const { todos, selectedUserId, userSelector, randomizeOrder } = this.props;
    const { queryTitle, conditionFilter } = this.state;
    const optionsForFilter = ['all', 'active', 'completed'];

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <div className="TodoList__top">
            <select
              name="perPage"
              defaultValue={conditionFilter}
              onChange={event => this.setConditionFilter(event.target.value)}
              className="page-selector"
            >
              {optionsForFilter.map(value => (
                <option value={value} key={value}>
                  {value}
                </option>
              ))}
            </select>
            <input
              type="text"
              onChange={event => this.setQueryTitle(event.target.value)}
              className="TodoList__input"
              placeholder="Search by title"
            />
            <button
              className="button"
              type="button"
              onClick={() => randomizeOrder()}
            >
              Randomize
            </button>
          </div>
          <ul className="TodoList__list">
            {todos.filter((todo) => {
              if (todo.title) {
                return todo.title.includes(queryTitle);
              }

              return false;
            })
              .filter((todo) => {
                switch (conditionFilter) {
                  case ('completed'):
                    return todo.completed;
                  case ('active'):
                    return !todo.completed;
                  default:
                    return true;
                }
              })
              .map(({ id, userId, title, completed }) => (
                <li
                  key={id}
                  className={`TodoList__item ${completed
                    ? 'TodoList__item--checked'
                    : 'TodoList__item--unchecked'
                  }`}
                >
                  <label>
                    <input
                      type="checkbox"
                      checked={completed}
                      readOnly
                    />
                    <p>{title}</p>
                  </label>

                  <button
                    className={`TodoList__user-button button ${
                      selectedUserId === userId
                        ? 'TodoList__user-button--selected'
                        : ''
                    }`}
                    type="button"
                    onClick={() => userSelector(userId)}
                  >
                    User&nbsp;#
                    {userId}
                  </button>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedUserId: PropTypes.number.isRequired,
  userSelector: PropTypes.func.isRequired,
  randomizeOrder: PropTypes.func.isRequired,
};
