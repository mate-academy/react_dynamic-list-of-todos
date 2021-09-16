import React from 'react';
import { loadTodos } from './api/api';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

interface State {
  selectedUserId: number;
  todos: Todo[];
  errorMessage: string;
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
    errorMessage: '',
  };

  componentDidMount() {
    this.getLoadedTodos();
  }

  async getLoadedTodos() {
    try {
      const todos: Todo[] = await loadTodos();

      this.setState({ todos, errorMessage: '' });
    } catch (error) {
      this.setState({ errorMessage: 'Can\'t load todos' });
    }
  }

  getUsersId = (userId: number) => {
    this.setState(() => ({ selectedUserId: userId }));
  };

  clearUserId = () => {
    this.setState({ selectedUserId: 0 });
  };

  render() {
    const { selectedUserId, todos, errorMessage } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          {!errorMessage ? (
            <TodoList
              todos={todos}
              onUsersId={this.getUsersId}
            />
          ) : errorMessage}
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                onClearUserId={this.clearUserId}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
