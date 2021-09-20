import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

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

  async componentDidMount() {
    try {
      const todos = await getTodos();

      this.setState({ todos });
    } catch (error) {
      this.setState({ errorMessage: 'Error' });
    }
  }

  updatedUserId = (id: number) => {
    this.setState({
      selectedUserId: id,
    });
  };

  resetUserId = () => {
    this.setState({
      selectedUserId: 0,
    });
  };

  render() {
    const {
      selectedUserId,
      todos,
      errorMessage,
    } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          {!errorMessage ? (
            <TodoList
              todos={todos}
              updatedUserId={this.updatedUserId}
            />
          ) : (
            { errorMessage }
          )}
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                selectedUserId={selectedUserId}
                resetUserId={this.resetUserId}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
