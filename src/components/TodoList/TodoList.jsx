import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    selected: [],
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.todos.length
        !== this.props.todos.length
        && prevProps.todos.length === 0
    ) {
      /* eslint-disable */ 
      this.setState({
        selected: this.props.todos.filter(todo => todo.completed === true).map(todo => todo.id),
      })
       /* eslint-enable */
    }
  }

  render() {
    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <input
          type="text"
          value={this.props.query}
          onChange={((event) => {
            this.props.setQuery(event.target.value);
            this.props.setCriterion(`all`);
          })}
        />
        {' '}
        <select
          value={this.props.criterion}
          onChange={(event) => {
            this.props.setCriterion(
              event.target.value, [...this.state.selected],
            );
          }}
        >
          <option value="">chose your variant</option>
          <option
            value="all"
          >
            all
          </option>
          <option
            value="completed"
          >
            completed
          </option>
          <option
            value="active"
          >
            active
          </option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {this.props.todos.map(todo => (
              <li
                key={todo.id}
                className={classNames(
                  'TodoList__item', {
                    'TodoList__item--unchecked':
                  !this.state.selected.includes(todo.id),
                    'TodoList__item--checked':
                  this.state.selected.includes(todo.id),
                  },
                )}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={this.state.selected.includes(todo.id)}
                    onChange={() => {
                      if (!this.state.selected.includes(todo.id)) {
                        this.setState(state => ({
                          selected: [...state.selected, todo.id],
                        }));
                      } else {
                        this.setState(state => ({
                          selected: state.selected.filter(id => id !== todo.id),
                        }));
                      }
                    }}
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
                  onClick={() => {
                    this.props.setUser(todo.userId);
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
  todos: PropTypes.arrayOf(PropTypes.shape(
    {
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    },
  ).isRequired).isRequired,
  setCriterion: PropTypes.func.isRequired,
  criterion: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
  setUser: PropTypes.func.isRequired,
  setQuery: PropTypes.func.isRequired,
};
