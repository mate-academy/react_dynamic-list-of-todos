import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { request } from './api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: null,
  };

  componentDidMount() {
    request()
      .then(todosFromServ => this.setState({ todos: todosFromServ }));
  }

  handleUserSelect = (userId) => {
    this.setState({ selectedUserId: userId });
  }

  clear = () => {
    this.setState({ selectedUserId: null });
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            handleUserSelect={userId => this.handleUserSelect(userId)}
            todos={todos}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clear={() => this.clear()}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
