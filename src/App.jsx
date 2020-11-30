import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

export class App extends React.Component {
  state = {
    todos: [],
    todosFilter: [],
    selectedUserId: 0,
  }

  async componentDidMount() {
    const todosRes = await getTodos();
    const todos = await todosRes
      .filter(todo => todo.title && todo.id && todo.userId);

    this.setState({
      todos,
      todosFilter: todos,
    });
  }

  handleChangeInput = (e) => {
    const { value } = e.target;

    this.setState(state => ({
      todosFilter: state.todos.filter(todo => todo.title.toLowerCase()
        .includes(value.toLowerCase())),
    }));
  };

  handleChangeSelect = (e) => {
    const { value } = e.target;
    const { todos } = this.state;

    this.setState({ todosFilter: todos
      // eslint-disable-next-line no-nested-ternary
      .filter(todo => (value === 'active'
        ? (!todo.completed)
        : value === 'completed'
          ? todo.completed
          : todo)) });
  }

  handleRandomize = () => {
    this.setState(state => ({
      todosFilter: [...state.todos].sort(() => Math.random() - 0.5),
    }));
  }

  handleClickUsers = (userId) => {
    this.setState({ selectedUserId: userId });
  }

  handleClear = () => this.setState({ selectedUserId: 0 })

  render() {
    const { todosFilter, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <h2>Todos:</h2>
          <div className="sidebar">
            <input
              type="text"
              className="input"
              placeholder="Enter title"
              onChange={this.handleChangeInput}
            />
            <select
              className="select"
              onChange={this.handleChangeSelect}
            >
              {['all', 'active', 'completed'].map(item => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <button
              type="button"
              className="randomize"
              onClick={this.handleRandomize}
            >
              Randomize
            </button>
          </div>
          <TodoList
            todos={todosFilter}
            userId={selectedUserId}
            handleClickUsers={this.handleClickUsers}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                handleClear={this.handleClear}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}
