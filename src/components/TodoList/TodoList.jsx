import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

export class TodoList extends React.Component {

  state = {
    query: '',
    select: 'all',
  };


  handleChange = (event) => {
    const {name, value} = event.target;

    this.setState({ [name]: value });
  };


  render() {
    const { query,select } = this.state;
    const { todos, selectUser } = this.props;

    const filteredTask = todos
    .filter( task => {
      if(query) {
        return (
          task.title !== null
          && task.title.toLowerCase().includes(query.toLowerCase())
        )
      }
      return task;
    })
    .filter(task => {
      if( select === 'Active') {
        return task.completed === false;
      } else if ( select === 'Completed') {
        return task.completed === true;
      }
      return task;
    });

    return(
      <div className="TodoList">
        <h2>Todos:</h2>
        <form>
          <label>
            Find
            <input
              type="text"
              name="query"
              placeholder="Find task"
              value={query}
              onChange={this.handleChange}/>
          </label>

          <label>
            Show
            <select
              name="select"
              value={select} 
              onChange={this.handleChange}
            >
              <option>All</option>
              <option>Active</option>
              <option>Completed</option>
            </select>
          </label>
        </form>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTask.map(todo => (
              <li
                className={classNames(
                  'TodoList__item',
                  {'TodoList__item--unchecked' : !todo.completed },
                  {'TodoList__item--checked' : todo.completed }
                )}
                key={todo.id}
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
                  onClick={() => selectUser(todo.userId)}
                >
                  User {todo.userId}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
};
