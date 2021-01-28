import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getAllTodos } from './components/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    getAllTodos().then(todos => this.setState({ todos: todos.data }));
  }

  selectUser = (userId) => {
    this.setState({
      selectedUserId: userId,
    });
  }

  clearUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList todos={todos} selectUser={this.selectUser} />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser userId={selectedUserId} clearUser={this.clearUser} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
