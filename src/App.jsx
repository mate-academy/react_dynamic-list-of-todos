import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    getTodos()
      .then(todos => {
        this.setState({
          todos: todos.data,
        })
      })
  };

  setQuery = (str) => {
    this.setState({
      query: str,
    });
    this.setState(state => ({
      todos: state.todos,
    }));
  }

  selectUser = (id) => {
    if(id) {
    this.setState({
      selectedUserId: id,
    });
  } else {
    alert(`Error`);
  }
  };

  clearSelectedUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  };
  
  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList todos={todos} selectUser={this.selectUser} setQuery={this.setQuery} />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser userId={selectedUserId} clearSelectedUser={this.clearSelectedUser} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
