import React from 'react';
import './App.scss';
import './styles/general.scss';
import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    randomizedTodos: null,
  };

  componentDidMount() {
    this.loadTodos(getTodos);
  }

  loadTodos = async(promise) => {
    const response = await promise();

    this.setState({
      todos: response.data,
    });
  };

  setSelectedUser = (userId) => {
    this.setState({ selectedUserId: userId });
  }

  randomizeOrder = () => {
    const { todos } = this.state;

    this.setState({ randomizedTodos: todos.map(todo => ({
      ...todo,
      randomId: Math.random(),
    })).sort((a, b) => a.randomId - b.randomId) });
  };

  render() {
    const { todos, selectedUserId, randomizedTodos } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={randomizedTodos || todos}
            userSelector={this.setSelectedUser}
            selectedUserId={selectedUserId}
            setQueryTitle={this.setQueryTitle}
            randomizeOrder={this.randomizeOrder}
          />
        </div>
        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                setSelectedUser={this.setSelectedUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
