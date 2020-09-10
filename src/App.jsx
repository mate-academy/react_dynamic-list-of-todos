import React from 'react';
import './App.scss';
import './styles/general.scss';
import { todosPromis, userFromServer } from './api/todos';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    selectedUser: {},
  };

  componentDidMount() {
    todosPromis()
      .then(todos => (
        this.setState({
          todos: todos.filter(item => (item.title && item.userId)),
        })
      ));
  }

  currentUserId = (userId) => {
    userFromServer(userId)
      .then(result => this.setState({
        selectedUser: result,
        selectedUserId: userId,
      }));
  }

  clearUserinfo = () => {
    this.setState({
      selectedUserId: 0,
      selectedUser: {},
    });
  }

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
                clear={this.clearUserinfo}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
