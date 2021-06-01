/* eslint-disable react/no-access-state-in-setstate */
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
    copiedTodos: [],
    selectedUserId: 0,
    title: '',
    selectOption: '',
    randomOption: false,
  };

  componentDidMount() {
    this.updateTodos();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.title !== this.state.title) {
      this.titleParse();
    }

    if (prevState.randomOption !== this.state.randomOption) {
      this.randomOrder();
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  updateTodos = async() => {
    const todos = await getTodos();

    this.setState({
      todos,
      copiedTodos: [...todos],
    });
  }

  selectUserId = (id) => {
    this.setState({ selectedUserId: id });
  }

  randomOrder() {
    const newArr = (this.state.randomOption)
      ? this.state.copiedTodos.sort(() => Math.random() - 0.5)
      : this.titleParse();

    this.setState({ copiedTodos: newArr });
  }

  titleParse() {
    const newTodos = this.state.todos.filter((todo) => {
      if (todo.title === null) {
        return false;
      }

      return todo.title.includes(this.state.title);
    });

    this.setState({ copiedTodos: newTodos });

    return newTodos;
  }

  render() {
    const { selectedUserId, title, copiedTodos, selectOption, randomOption }
      = this.state;

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
              name="selectOption"
              value={selectOption}
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
            todos={copiedTodos}
            onSelected={this.selectUserId}
            selectOption={selectOption}
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
