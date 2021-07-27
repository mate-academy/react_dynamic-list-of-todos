import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    filterParameters: '',
    selectParameters: 'all',
  };

  filterTodosByTitle = (value) => {
    this.setState({
      filterParameters: value,
    })
  };

    filterTodosByState = (value) => {
      this.setState({
        selectParameters: value,
      })
    };

  render() {
    const {
      todos,
      onClick,
      userId,
    } = this.props;
    const {
      filterParameters,
      selectParameters,
    } = this.state;

    const filteredTodos = todos
    .filter(
      todo => todo.title 
        && todo.title.includes(filterParameters)
    )
    .filter(
      todo => {
        switch(selectParameters) {
          case 'all':
            return true;
          case 'active':
            return !todo.completed;
          case 'completed':
            return todo.completed;
        }
      }
    )
    return (
      <div className="TodoList">
        <h2>Todos:</h2>
    
        <div className="TodoList__list-container">
          <input
            type="text"
            onChange={({ target }) => this.filterTodosByTitle(target.value)}
          />
          <select
            name="select"
            onChange={({ target }) => this.filterTodosByState(target.value)}
          >
            <option
              value='all'
            >
              All
            </option>
            <option
              value='active'
            >
              Active
            </option>
            <option
              value='completed'
            >
              Completed
            </option>
          </select>
          <ul className="TodoList__list">
            {
              filteredTodos.map(todo => (
                <li
                  key={todo.id}
                  className={classNames(
                    'TodoList__item',{
                    'TodoList__item--checked': todo.completed,
                    'TodoList__item--unchecked': !todo.completed,
                    })
                  }
                >
                  <label>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      readOnly/>
                    <p>{todo.title}</p>
                  </label>
                  <button
                    className={classNames(
                      'TodoList__user-button',
                      'button',
                      {'TodoList__user-button--selected': todo.userId === userId}
                    )}
                    type="button"
                    onClick={() => onClick(todo.userId)}
                  >
                    {todo.userId}#
                  </button>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}; 
TodoList.defaultProps = {todos: PropTypes.arrayOf(PropTypes.shape({
  title: '',
  completed: false,
  userId: 0,
  })),
  
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    completed: PropTypes.bool,
    userId: PropTypes.number,
  })),
  onClick: PropTypes.func.isRequired,
  userId: PropTypes.number,
}
