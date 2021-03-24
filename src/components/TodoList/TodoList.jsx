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
      todos,
      loadedTodos: todos,
    });
  }

  componentDidUpdate(_, prevState){
    const { option, query} = this.state;

    if (prevState.option !== option || prevState.query !== query) {
      this.filterList(query, option)
    }
  }

  queryHandler = (event) => {
    const curentValue = event.target.value;

    this.setState({ query: curentValue });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  filterByOption = (filteredTodos, option) => {
    const completedTodos = filteredTodos.filter(todo => todo.completed);
    const uncompletedTodos = filteredTodos.filter(todo => !todo.completed);

    switch (option) {
      case 'completed':
        return this.setState({
          todos: completedTodos,
        });

      case 'uncompleted':
        return this.setState({
          todos: uncompletedTodos,
        });

      case 'all':
      default: return true;
    }
  }

  filterList = (inputText, option) => {
    const { loadedTodos } = this.state;

    const filteredTodos = loadedTodos.filter((todo) => {
        const title = todo.title.toLowerCase();
        const query = inputText.toLowerCase();

        return title.includes(query)
      })

    this.setState({
        todos:  filteredTodos
      }, () => this.filterByOption(filteredTodos, option))
  }

  render() {
    const { onUserSelect, selectedUserId } = this.props;
    const { todos, query } = this.state;

    console.log(todos);

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
              onChange={this.queryHandler}
            />
          </label>
          <select
            value={this.state.option}
            name="option"
            onChange={this.handleChange}
          >
            <option value="initial" disabled>
              choose parameter
            </option>
            <option
              value="completed"
            >
              completed
            </option>
            <option value="uncompleted">
              uncompleted
            </option>
            <option value="all">
              all
            </option>
          </select>
          <ul className="TodoList__list">
            {todos.map(todo => (
              <Todo
                key={todo.id}
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
    );
  }
}

TodoList.propTypes = {
  onUserSelect: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
};
