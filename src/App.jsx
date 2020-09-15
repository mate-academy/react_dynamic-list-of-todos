import React from 'react';
import './App.scss';
import './styles/general.scss';
import { getTodos } from './api/api';
import { TodoList } from './components/TodoList/TodoList';
import { CurrentUser } from './components/CurrentUser/CurrentUser';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    getTodos().then((todos) => {
      const incomeData = todos.data;

      this.setState({
        todos: incomeData,
      });
    });
  }

  setUserId = (userId) => {
    this.setState({
      selectedUserId: userId,
    });
  }

  render() {
    const {
      todos,
      selectedUserId,
    } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            setUserId={this.setUserId}
          />
        </div>
        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                setUserId={this.setUserId}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
