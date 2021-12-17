import React from 'react';
import './App.scss';
import './styles/general.scss';
import { getData } from './api/api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

interface State {
  todos: Todo[] | [];
  selectedUserId: number;
}

class App extends React.Component<{}, State> {
  state: State = {
    todos: [],
    selectedUserId: 0,
  };

  async componentDidMount() {
    const todos = await getData('todos');

    this.setState({ todos });
  }

  selectUser = (id: number) => {
    this.setState({ selectedUserId: id });
  };

  handleClear = () => {
    this.setState({ selectedUserId: 0 });
  };

  render() {
    const { selectedUserId, todos } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectedUserId={selectedUserId}
            selectUser={this.selectUser}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                handleClear={this.handleClear}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
