import React from 'react';
import './App.scss';
import './styles/general.scss';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    selectedUser: {},
  };

  componentDidMount() {
    getTodos()
      .then(todos => (
        this.setState({
          todos: todos.filter(item => (item.title && item.userId)),
        })
      ));
  }

  currentUserId = (userId) => {
    this.setState({ selectedUserId: userId });
  };

  clearUserinfo = () => {
    this.setState({
      selectedUserId: 0,
      selectedUser: null,
    });
  };

  render() {
    const { todos, selectedUserId, selectedUser } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            takeUserId={this.currentUserId}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                user={selectedUser}
                userId={selectedUserId}
                clearSelection={this.clearUserinfo}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
