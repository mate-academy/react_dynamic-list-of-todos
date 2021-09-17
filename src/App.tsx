import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { loadTodos } from './components/api/api';

interface State {
  todos: Todo[]
  selectedUserId: number;
}

class App extends React.Component<{}, State> {
  state: State = {
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    loadTodos()
      .then((data) => {
        this.setState({
          todos: data,
        });
      });
  }

  handleUserSelection = (userId: number) => {
    this.setState({ selectedUserId: userId });
  };

  resetSelectedUser = () => {
    this.setState({ selectedUserId: 0 });
  };

  render() {
    const { selectedUserId, todos } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            selectedUserId={selectedUserId}
            todos={todos}
            onUserSelection={this.handleUserSelection}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                onReset={this.resetSelectedUser}
                userId={selectedUserId}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
