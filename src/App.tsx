import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

interface State {
  todos: Todo[],
  selectedUserId: number,
  isLoading: boolean,
}

class App extends React.Component<{}, State> {
  state: State = {
    todos: [] as Todo[],
    selectedUserId: 0,
    isLoading: true,
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({
      todos,
      isLoading: false,
    });
  }

  setUser = (userId = 0) => {
    this.setState({ selectedUserId: userId });
  };

  render() {
    const { selectedUserId, todos, isLoading } = this.state;

    return (
      <div className="App">
        {isLoading ? 'Loading todos' : (
          <div className="App__sidebar">
            <TodoList
              todos={todos}
              selectedUser={selectedUserId}
              onUserSelect={this.setUser}
            />
          </div>
        )}

        <div className="App__content">
          <div className="App__content-container">
            {!!selectedUserId && (
              <CurrentUser
                userId={selectedUserId}
                resetUser={this.setUser}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
