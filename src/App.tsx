import React from 'react';
import './App.scss';
import { getTodos } from './components/api';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

interface State {
  selectedUserId: number;
  todos: [];
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
  };

  componentDidMount() {
    getTodos('todos')
      .then(info => info.json())
      .then((data: []) => {
        this.setState({
          todos: data,
        });
      });
  }

  setId = (id: number) => {
    this.setState({ selectedUserId: id });
  };

  clearSelectedUser = () => {
    this.setState({ selectedUserId: 0 });
  };

  // filteredResult = () => {
  //   this.setState({
  //     todos:
  //   })
  // };

  render() {
    const { selectedUserId, todos } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          {todos.length > 0 && (
            <TodoList selectedUserId={selectedUserId} setId={this.setId} todo={todos} />
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
