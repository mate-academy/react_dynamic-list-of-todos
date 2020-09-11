import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

class App extends React.Component {
  state = {
    todos: [],
    todosFromServer: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    getTodos()
      .then(todos => todos.filter(todo => todo.title))
      .then(todos => (
        this.setState({
          todos,
          todosFromServer: todos,
        })
      ));
  }

  handleChangingUser = (id) => {
    this.setState({
      selectedUserId: id,
    });
  }

  handleSearchedValue = (value) => {
    this.setState(state => ({
      todos: state.todosFromServer.filter(todo => todo.title.includes(value)),
    }));
  }

  handleFilter = (value) => {
    let filter;

    switch (value) {
      case 'completed':
        filter = todo => todo.completed === true;
        break;

      case 'active':
        filter = todo => todo.completed === false;
        break;

      default:
        filter = todo => todo;
    }

    this.setState(state => ({
      todos: state.todosFromServer.filter(filter),
    }));
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            onUser={this.handleChangingUser}
            onFilter={this.handleFilter}
            onSearch={this.handleSearchedValue}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                onUser={this.handleChangingUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
