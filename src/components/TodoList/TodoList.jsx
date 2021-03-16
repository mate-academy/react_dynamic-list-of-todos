import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { todosFromServer } from '../../api';

export class TodoList extends React.Component {
  state = {
    visibleTodos: [],
    todos: [],
    title: '',
    select: 'all',
  }

  componentDidMount() {
    todosFromServer()
      .then(todo => this.setState({
        visibleTodos: todo,
        todos: todo,
      }));
  }

  findMatchedTodos = () => {
    this.setState(prevState => ({
      todos: prevState.visibleTodos.filter(
        todo => todo.title && todo.title.includes(prevState.title),
      ),
    }));
  }

  changeHandleOnSelect = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });

    switch (value) {
      case 'active':
        this.setState(prevState => ({
          todos: prevState.visibleTodos.filter(todo => !todo.completed),
        }));
        break;
      case 'completed':
        this.setState(prevState => ({
          todos: prevState.visibleTodos.filter(todo => todo.completed),
        }));
        break;
      default:
        this.setState(prevState => ({
          todos: prevState.visibleTodos,
        }));
    }
  };

  changeHandle = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
    this.findMatchedTodos();
  };

  render() {
    const { selectUser } = this.props;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.changeHandle}
            placeholder="title"
          />

          <select
            type="text"
            name="select"
            value={this.state.select}
            onChange={this.changeHandleOnSelect}
          >
            <option>all</option>
            <option>active</option>
            <option>completed</option>
          </select>

          <ul className="TodoList__list">

            {this.state.todos.map(todo => (
              <li
                className={classNames(
                  'TodoList__item TodoList', {
                    'TodoList__item--checked': todo.completed,
                    'TodoList__item--unchecked': !todo.completed,
                  },
                )}
                key={todo.id}
              >
                <label>
                  <input type="checkbox" readOnly checked={todo.completed} />
                  <p>{todo.title}</p>
                </label>

                <button
                  onClick={() => {
                    selectUser(todo.userId);
                  }}
                  className="TodoList__user-button button"
                  type="button"
                >
                  User&nbsp;#
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
  selectUser: PropTypes.func.isRequired,
};
