import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getData } from './api/api';

interface State {
  todos: Todo[];
  selectedUserId: number;
  errorMessage: string;
}

class App extends React.Component<{}, State> {
  state: State = {
    todos: [],
    selectedUserId: 0,
    errorMessage: '',
  };

  async componentDidMount() {
    try {
      const todos = await getData('/todos');

      this.setState({ todos });
    } catch {
      this.setState({ errorMessage: 'I don\'t know where this page is)0' });
    }
  }

  selectedUser = (id: number) => {
    this.setState({ selectedUserId: id });
  };

  clearUser = () => {
    this.setState({ selectedUserId: 0 });
  };

  render() {
    const { selectedUserId, todos, errorMessage } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            selectedUserId={selectedUserId}
            todos={todos}
            selectedUser={this.selectedUser}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clearUser={this.clearUser}
              />
            ) : <p>{ errorMessage }</p>}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
