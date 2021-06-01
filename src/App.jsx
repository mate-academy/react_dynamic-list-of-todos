/* eslint-disable no-unreachable */
import React from 'react';
import './App.scss';
import './styles/general.scss';
import classNames from 'classnames';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    title: '',
    selectedOption: '',
    randomOption: false,
  };

  componentDidMount() {
    this.updateTodos();
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  updateTodos = async() => {
    const todos = await getTodos();

    this.setState({ todos });
  }

  selectUserId = (id) => {
    this.setState({ selectedUserId: id });
  }

  prepareTodos = () => {
    let filteredTodos = this.state.todos.filter((todo) => {
      if (todo.title === null) {
        return false;
      }

      if (todo.title.includes(this.state.title)) {
        switch (this.state.selectedOption) {
          case 'active':
            return !todo.completed;

            break;
          case 'completed':
            return todo.completed;

            break;
          default:
            return true;
        }
      } else {
        return false;
      }
    });

    filteredTodos = (this.state.randomOption)
      ? filteredTodos.sort(() => Math.random() - 0.5)
      : filteredTodos;

    return filteredTodos;
  }

  render() {
    const { selectedUserId, title, selectedOption, randomOption }
      = this.state;
    const renderedTodos = this.prepareTodos();

    return (
      <div className="App">
        <div className="App__sidebar">
          <div className="filter">
            <input
              className="filter-item"
              type="text"
              name="title"
              placeholder="Title"
              value={title}
              onChange={this.handleChange}
            />
            <select
              className="filter-item"
              name="selectedOption"
              value={selectedOption}
              onChange={this.handleChange}
            >
              <option
                selected
                value="all"
              >
                All
              </option>
              <option
                value="active"
              >
                Active
              </option>
              <option
                value="completed"
              >
                Comleted
              </option>
            </select>
            <button
              className={classNames('filter-item', 'button', {
                'TodoList__user-button--selected': randomOption,
              })}
              type="submit"
              onClick={() => this.setState({ randomOption: !randomOption })}
            >
              {randomOption ? 'Standart order' : 'Random order'}
            </button>
          </div>
          <TodoList
            todos={renderedTodos}
            onSelected={this.selectUserId}
            selectedOption={selectedOption}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                onClear={this.selectUserId}
                onSelected={this.selectUserId}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
