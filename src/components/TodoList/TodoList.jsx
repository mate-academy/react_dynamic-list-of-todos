import React from 'react';
import './TodoList.scss';

import PropTypes from 'prop-types';

export class TodoList extends React.Component{
  state = {
    substringForFilter: '',
    status: 'all',
    todos: [],
    checked: {},
  }

  render() {
    const { selectUser,todos } = this.props;
    const { substringForFilter } = this.state;

    return(
      <div className="TodoList">
      <h2>Todos:</h2>

      <input
        type='text'
        placeholder='title'
        value={substringForFilter}
        onChange={(event) => {
          this.setState({
            substringForFilter: event.target.value,
          })
        }}
      />

      <select
        value={this.state.status}
        onChange={(event)=>{
          this.setState({status: event.target.value,})
        }}
      >
        <option value='all'>All</option>
        <option value='active'>Active</option>
        <option value='completed'>Completed</option>
      </select>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {todos
            .filter(todo => todo.title && todo.title.includes(substringForFilter))
            .filter(todo => this.state.status === 'all'
              ? (todo.completed === true || todo.completed === false)
              : this.state.status === 'active'
              ? todo.completed === false
              : this.state.status === 'completed'
              ? todo.completed === true
              : null)
            .map(todo => (
          <li
            className={`TodoList__item ${todo.completed ? 'TodoList__item--checked' : 'TodoList__item--unchecked'}`}
            key={todo.id}
          >{`${todo.completed}`}
            <label>
              <input type="checkbox"
              readOnly
              checked={
                todo.completed ? true : false
              }
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
              onClick={()=>{selectUser(todo.userId)}}
            >
              User&nbsp;#{todo.userId}
            </button>
          </li>
          ))}

        </ul>
      </div>
    </div>
    )
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      completed: PropTypes.bool,
    }),
  )
}

