import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { allTodos, allUsers } from './api';
import 'semantic-ui-css/semantic.min.css';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    allTodos()
      .then(data => this.setState({
        todos: data,
      }));
  }

  selectedUser = (idUser) => {
    // eslint-disable-next-line no-console
    console.log('id', idUser);
    this.setState({
      selectedUserId: idUser,
    });
  }

  clear = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectedUser={this.selectedUser}
            selectedUserId={selectedUserId}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                allUsers={allUsers}
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
