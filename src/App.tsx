import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos, getUser } from './api/api';

interface State {
  currentUser: User | null;
  todos : Todo[];
}

class App extends React.Component<{}, State> {
  state: State = {
    currentUser: null,
    todos: [],
  };

  async componentDidMount() {
    this.setState({
      todos: await getTodos(),
    });
  }

  clearUser = () => {
    this.setState({ currentUser: null });
  };

  currentUser = async (id: number): Promise<void> => {
    const { currentUser } = this.state;

    if (currentUser?.id !== id) {
      this.setState({
        currentUser: await getUser(id),
      });
    }
  };

  render() {
    const { currentUser, todos } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList todos={todos} setUser={this.currentUser} />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {currentUser ? (
              <CurrentUser user={currentUser} clear={this.clearUser} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
