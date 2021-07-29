import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { TodosFromServer } from './app';

class App extends React.Component {
  state = {
    selectedUserId: 0,
    todos: [],
  };

  componentDidMount() {
    TodosFromServer().then(a => this.setState(
      {
        todos: a.data,
      },
    ));
  }

  chooseTheUser = (id) => {
    this.setState({ selectedUserId: id });
  }

  clearTheUser = () => this.setState({ selectedUserId: 0 });

  render() {
    const { selectedUserId, todos } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectedUserId={selectedUserId}
            chooseTheUser={this.chooseTheUser}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clearTheUser={this.clearTheUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
