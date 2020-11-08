import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    showUserInfo: false,
  };

  componentDidMount() {
    getTodos()
      .then((todos) => {
        this.setState({
          todos: todos.slice(0, 200),
        });
      });
  }

  selectUser = (selectedUserId) => {
    this.setState({
      selectedUserId,
      showUserInfo: true,
    });
  }

  showInfo = () => {
    this.setState(prevState => ({
      showUserInfo: !prevState.showUserInfo,
    }));
  };

  render() {
    const { todos, selectedUserId, showUserInfo } = this.state;

    return (
      <div className="App">
        {todos.length > 0 && (
          <div className="App__sidebar">
            <TodoList todos={todos} selectUser={this.selectUser} />
          </div>
        )}

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId && showUserInfo ? (
              <CurrentUser userId={selectedUserId} showInfo={this.showInfo} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
