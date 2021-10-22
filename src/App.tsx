import React from 'react';
import './App.scss';
import './styles/general.scss';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos, getUser } from './api';

import { TodoList } from './components/TodoList/TodoList';
import { CurrentUser } from './components/CurrentUser/CurrentUser';

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
    const todos = await getTodos();

    this.setState({ todos });
  }

  unselectUser = () => {
    this.setState({ currentUser: null });
  };

  currentUser = async (id: number): Promise<void> => {
    const currentUser = await getUser(id);

    if (this.state.currentUser?.id !== id) {
      this.setState({ currentUser });
    }
  };

  render() {
    const { currentUser, todos } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList {...{ todos, setUser: this.currentUser }} />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {currentUser ? (
              <CurrentUser user={currentUser} unselect={this.unselectUser} />
            ) : (
              <p style={{ textAlign: 'center' }}>No user selected</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default App;
