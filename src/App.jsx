import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getData } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    this.loadTodoList();
  }

  onSelectedUser = (userId) => {
    this.setState({
      selectedUserId: userId,
    });
  }

  loadTodoList = async() => {
    const prepearedTodoList = await getData(`/todos`);

    this.setState({
      todos: prepearedTodoList.data,
    });
  }

  clearSelectedUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            onSelectedUser={this.onSelectedUser}
            userId={selectedUserId}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clearSelectedUser={this.clearSelectedUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
