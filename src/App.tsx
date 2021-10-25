import React from 'react';
import './App.scss';
import './styles/general.scss';
import { getFromServer } from './api/api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { Todo } from './react-app-env';

interface State {
  selectedUserId: number | null;
  todos: Todo[] | [];
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: null,
    todos: [],
  };

  async componentDidMount() {
    // const [todosFromServer, usersFromServer] = await Promise.all([
    //   getFromServer('todos'),
    //   getFromServer('users'),
    // ]);
    const todosFromServer = await getFromServer('todos') as Todo[];

    this.setState({ todos: todosFromServer });
  }

  onUnselectUser = () => {
    this.setState({ selectedUserId: null });
  };

  onSelect = (id: number) => {
    this.setState({ selectedUserId: id });
  };

  render() {
    const { selectedUserId, todos } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList todos={todos} selectedUser={selectedUserId} onSelect={this.onSelect} />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser selectedUser={selectedUserId} onUnselect={this.onUnselectUser} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
