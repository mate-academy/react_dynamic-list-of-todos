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
    errorMessage: '',
  };

  async componentDidMount() {
    try {
      const todosFromServer = await getTodos();

      this.setState({ todos: todosFromServer });
    } catch (error) {
      this.setState({ errorMessage: `Can't load todos` });
    }
  }

  updateUser = (id) => {
    this.setState({ selectedUserId: id });
  }

  clearUser = () => {
    this.setState({ selectedUserId: 0 });
  }

  render() {
    const { todos, selectedUserId, errorMessage } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          {!errorMessage ? todos && (
            <TodoList todos={todos} updateUser={this.updateUser} />
          ) : (
            <p className="error">{errorMessage}</p>
          )}
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId > 0 ? (
              <CurrentUser userId={selectedUserId} clearUser={this.clearUser} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
