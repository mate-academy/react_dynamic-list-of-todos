import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';

export class TodoList extends React.Component {
  state = {
    query: '',
    selected: '',
  };

  selectChange = (event) => {
    this.setState({
      selected: event.target.value,
    });
    console.log(event.target.value)
  };

  render() {
    const { todos } = this.props;
    const { query, selected } = this.state;
    const filteredTodos = todos.filter(todo => todo.title !== '' && todo.userId !== null)
    .filter(todo => todo.title.includes(query))
    .filter((todo) => {
      if (selected === 'active') {
        return todo.completed === false;
      }

      if (selected === 'completed') {
        return todo.completed === true;
      }

      return todo;
    });
    
    return (
      <div className="TodoList">
    <h2>Todos:</h2>
      <input
        type='text'
        value={this.state.query}
          onChange={(event) => {
            this.setState({
              query: event.target.value,
            });
        }}
      />
      Enter title
      <select value={this.state.selcted} onChange={this.selectChange}>
      <option>
          Choose the filter
        </option>
        <option value='all'>
          All
        </option>
        <option value='active'>
          Active
        </option>
        <option value='completed'>
          Finished
        </option>
      </select>
    <div className="TodoList__list-container">
          {filteredTodos.map(todo => (
             <ul className="TodoList__list" key={todo.id}>
                <li className={`TodoList__item 
                  ${ (todo.completed === true)
                  ? 'TodoList__item--checked' : 'TodoList__item--unchecked'}`}
                >
                 <label>
                    <input type="checkbox" checked={todo.completed} readOnly />
                    <p>{todo.title}</p>
                  </label>
                  <button
                    className="
                      TodoList__user-button
                      TodoList__user-button--selected
                      button
                    "
                    type="button"
                    value={todo.userId}
                    onClick={(todo) => this.props.selectUser(todo.target.value)}
                  >
                    User&nbsp;{todo.userId}
                  </button>
                </li>
              </ul>
          ))}
    </div>
  </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.shape(
    {
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    },
  ).isRequired,
  selectUser: PropTypes.func.isRequired,
  setQuery: PropTypes.func.isRequired,
};
