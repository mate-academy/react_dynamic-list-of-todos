import React from 'react';
import './App.scss';
import './styles/general.scss';
import { fetchTodos, fetchUserData } from './api/api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

interface State {
  currentUser: User | null;
  todos: Todo[];
}

class App extends React.Component<{}, State> {
  state: State = {
    currentUser: null,
    todos: [],
  };

  async componentDidMount() {
    this.setState({
      todos: await fetchTodos(),
    });
  }

  clearUser = () => {
    this.setState({ currentUser: null });
  };

  setCurrentUser = async (id: number): Promise<void> => {
    if (this.state.currentUser?.id !== id) {
      this.setState({
        currentUser: await fetchUserData(id),
      });
    }
  };

  render() {
    const { currentUser, todos } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList {...{ todos, setUser: this.setCurrentUser }} />
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
