import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos, getUser } from './api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    query: '',
    value: '',
  };

  componentDidMount() {
    getTodos()
      .then(todos => this.setState({
        todos: todos.filter(todo => todo.title),
      }));
  }

  onSelectUserId = (userId) => {
    this.setState({
      selectedUserId: +userId,
    });
  };

  clearUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  filterByTitle = (event) => {
    this.setState({
      query: event.target.value,
    });
  }

  selectByValue = (event) => {
    this.setState({
      value: event.target.value,
    });
  }

  prepareTodos = () => {
    const { value } = this.state;

    if (value === 'active') {
      return this.state.todos.filter(
        todo => !todo.completed,
      );
    }

    if (value === 'completed') {
      return this.state.todos.filter(
        todo => todo.completed,
      );
    }

    return this.state.todos;
  }

  render() {
    const { selectedUserId, query, value } = this.state;
    const filteredTodos = this.prepareTodos().filter(
      todo => todo.title.includes(this.state.query),
    );

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={filteredTodos}
            onSelectUserId={this.onSelectUserId}
            filterByTitle={this.filterByTitle}
            selectByValue={this.selectByValue}
            query={query}
            value={value}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                getUser={getUser}
                clearUser={this.clearUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
