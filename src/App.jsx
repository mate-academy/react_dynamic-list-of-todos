import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import {
  getUsersFromServer,
  getTodosFromServer,
  getUserIdFromServer
} from './components/api/api.js';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    users: [],
    user: [],
    searchTodo: '',
    inputText: '',
  };

  filtredTodos = () => {
    const { todos, inputText } = this.state;
    const filteredByTitle = todos.filter(todo => 
      todo.title.includes(inputText.toLowerCase()));
  
    if (!inputText) {
      return todos;
    }

    return filteredByTitle;
  }

  handleSelected = (selected)  => {
    switch (selected) {
      case 'all': {
        getTodosFromServer()
        .then(todos =>
          this.setState({todos: todos.filter(todo => todo)}));
        break;
      }

      case 'completed': {
        getTodosFromServer()
        .then(todos =>
          this.setState({todos: todos.filter(todo => todo.completed)}));
        break;
      }

      case 'active': {
        getTodosFromServer()
        .then(todos =>
          this.setState({todos: todos.filter(todo => !todo.completed)}));
        break;
      }
      default:
    }
  }

  getUserId = (userId) => {
    const { selectedUserId } = this.state;

    this.setState({selectedUserId: userId});
    getUserIdFromServer(selectedUserId + 1)
      .then(user =>  this.setState({user}));
  }

  clearUser = () => {
    this.setState({
      selectedUserId: 0,
      user: [],
    })
    
  }

  componentDidMount() {
    const { users } = this.state;

    getTodosFromServer()
      .then(todos => this.setState({todos}))

    getUsersFromServer(users)
      .then(users => this.setState({users}))
  }

  render() {
    const { selectedUserId, user } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">        
          <TodoList
            todos={this.filtredTodos()}
            getUserId={this.getUserId}
            handleInput={(inputText) => this.setState({inputText})}
            handleSelected={this.handleSelected}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                user={user}
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
