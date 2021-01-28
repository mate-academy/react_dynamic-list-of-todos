import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getAllTodos } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    getAllTodos()
      .then((todos) => {
        this.setState({ todos });
      });
  }

  clearUser = () => {
    this.setState({ selectedUserId: 0 });
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (

      <div className="App">
        {todos.length > 0 && (
          <>
            <div className="App__sidebar">
              <TodoList
                todos={todos}
                // eslint-disable-next-line no-shadow
                onUserSelect={(selectedUserId) => {
                  this.setState({ selectedUserId });
                }}
              />
            </div>

            <div className="App__content">
              <div className="App__content-container">
                {selectedUserId ? (
                  <CurrentUser
                    userId={selectedUserId}
                    clearUser={this.clearUser}
                  />
                ) : 'No user selected'}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default App;
