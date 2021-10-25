import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos, getUser } from './ api';

interface State {
  currentUser: User | null;
  todos: Todo[];
}

class App extends React.Component<{}, State> {
  state: State = {
    currentUser: null,
    todos: [],
  };

  componentDidMount() {
    getTodos()
      .then(todosFromServer => {
        this.setState({ todos: todosFromServer });
      });
  }

  currentUser = async (id: number): Promise<void> => {
    if (this.state.currentUser?.id !== id) {
      this.setState({ currentUser: await getUser(id) });
    }
  };

  clear = () => {
    this.setState({ currentUser: null });
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
              <CurrentUser
                user={currentUser}
                clear={this.clear}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
