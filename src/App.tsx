import React from 'react';
import './App.scss';
import './styles/general.scss';
import { getData } from './api/api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

interface State {
  todos: Todo[];
  selectedUserId: number;
  errorMessage: string
}

class App extends React.Component<{}, State> {
  state: State = {
    todos: [],
    selectedUserId: 0,
    errorMessage: '',
  };

  async componentDidMount() {
    try {
      const todos = await getData('todos');

      this.setState({ todos });
    } catch {
      this.setState({ errorMessage: 'List wasn\'t found' });
    }
  }

  selectUser = (id: number) => {
    this.setState({ selectedUserId: id });
  };

  handleClearUser = () => {
    this.setState({ selectedUserId: 0 });
  };

  render() {
    const { selectedUserId, todos, errorMessage } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          {todos.length ? (
            <TodoList
              todos={todos}
              selectedUserId={selectedUserId}
              selectUser={this.selectUser}
            />
          ) : (
            <p>{errorMessage}</p>
          ) }
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                handleClearUser={this.handleClearUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
