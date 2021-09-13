import React from 'react';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './components/api';
import { TodoList } from './components/TodoList';
import { Task } from './components/types/Task';
import './styles/general.scss';
import './App.scss';

interface State {
  selectedUserId: number;
  todos: Task[];
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
  };

  componentDidMount() {
    getTodos('todos')
      .then(info => info.json())
      .then((data: Task[]) => {
        this.setState({
          todos: data,
        });
      });
  }

  setUser = (id: number) => {
    this.setState({ selectedUserId: id });
  };

  clearSelectedUser = () => {
    this.setState({ selectedUserId: 0 });
  };

  render() {
    const { selectedUserId, todos } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          {!!todos.length && (
            <TodoList
              selectedUserId={selectedUserId}
              setUser={this.setUser}
              todo={todos}
            />
          )}
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clear={this.clearSelectedUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
