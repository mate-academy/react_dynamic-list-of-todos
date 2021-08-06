import React from 'react';
import './App.scss';
import './styles/general.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './components/api/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount = async() => {
    const todos = await getTodos();

    this.setState({
      todos,
    });
  }

  selectUser = (userId) => {
    this.setState({
      selectedUserId: userId,
    });
  }

  clearForm = () => {
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
            onSelect={this.selectUser}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clearForm={this.clearForm}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
