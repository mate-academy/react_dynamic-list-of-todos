import React from 'react';
import PropTypes from 'prop-types';
import { loadTodos } from '../../api';
import { Todo } from '../Todo/Todo';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    todos: [],
    loadedTodos: [],
    query: '',
    option: '',
  }

  async componentDidMount() {
    const todos = await loadTodos();

    this.setState({
      todos: todos,
      loadedTodos: todos,
    })
  }

  componentDidUpdate(_, prevState) {
    if (prevState.option !== this.state.option) {
      this.filterByOption(this.state.option)
    }

    if (prevState.query !== this.state.query) {
      this.filterList(this.state.query)
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  filterByOption = (option) => {
    const { loadedTodos } = this.state;

    switch(option) {
      case 'all':
        return this.setState({
          todos: loadedTodos.filter(todo => todo)
        });

      case 'completed':
        return this.setState({
          todos: loadedTodos.filter(todo => todo.completed === true)
        });

      case 'uncompleted':
        return this.setState({
          todos: loadedTodos.filter(todo => todo.completed === false)
        });

        default: return false;
    }
  }

  filterList = () => {
    const { loadedTodos } = this.state;

    this.setState(prevState => {
      const filtredTodos = loadedTodos.filter(todo => {
        const title = todo.title.toLowerCase();
        const query = prevState.query.toLowerCase();

        return title.includes(query);
      });

      return ({ todos: filtredTodos });
    })
  }

  render() {
    const { onUserSelect, selectedUserId } = this.props;
    const { todos, query } = this.state;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <label>
            Search: {' '}
            <input
              type="text"
              placeholder="find ToDo"
              name="query"
              value={query}
              onChange={this.handleChange}
            />
          </label>
          <select
            value={this.state.option}
            name='option'
            onChange={this.handleChange}
          >
            <option value='initial' disabled>
              choose parameter
            </option>
            <option
              value='completed'
            >
              completed
            </option>
            <option value='uncompleted'>
              uncompleted
            </option>
            <option value='all'>
              all
            </option>
          </select>
          <ul className="TodoList__list">
            {todos.map(todo => (
              <Todo key={todo.id}
                onUserSelect={onUserSelect}
                selectedUserId={selectedUserId}
                completed={todo.completed}
                userId={todo.userId}
                title={todo.title}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

TodoList.propTypes = {
  onUserSelect: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
}
