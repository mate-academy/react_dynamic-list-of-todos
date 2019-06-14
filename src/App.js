import React, { Component } from 'react';
import './App.css';
import { TodoList } from './components/TodoList';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      todos: null,
      users: null,
      isTODOSLoaded: false,
      isUsersLoaded: false,
      loadingCount: 0
    };
  }
  
  loadData = () => {
    this.makeRequest(`${BASE_URL}/todos`, this.handleTODOsLoad);
    this.makeRequest(`${BASE_URL}/users`, this.handleUsersLoad);
  };

  handleTODOsLoad = xhr => () => {
    this.setState(prevState => ({
        todos: JSON.parse(xhr.responseText),
        isTODOSLoaded: true,
        loadingCount: --prevState.loadingCount
      }));
  };
  
  handleUsersLoad = xhr => () => {
    this.setState(prevState => ({
        users: JSON.parse(xhr.responseText),
        isUsersLoaded: true,
        loadingCount: --prevState.loadingCount
      }));
  };
 
  makeRequest(url, cb) {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url);
    xhr.addEventListener('load', cb(xhr));
    xhr.send();
    this.setState(prevState => ({ loadingCount: ++prevState.loadingCount }));
  }
  
  render() {
    const {
      isTODOSLoaded,
      isUsersLoaded,
      todos,
      users,
      loadingCount
    } = this.state;
    
    const isLoaded = isTODOSLoaded && isUsersLoaded;
    const isLoading = loadingCount !== 0;

    const button =(
    <button 
        type="button"
        disabled={isLoaded}
        onClick={this.loadData}
        >
          {isLoading ? 'Loading...' : 'Load data'}
        </button>
      );
    
    if (!isLoaded) {
      return button;
        
    } else {
      const usersMap = users.reduce((acc, user) => ({...acc, [user.id]: user}), {});
      const todosWithUsers = todos.map(todo => ({...todo, user: usersMap[todo.userId]}));
      return (
      <>
      {button}  
      <TodoList todos={todosWithUsers} />);
      </>
      );  
    }
}
}

export default App;
