import React from 'react';
import './App.scss';
import './styles/general.scss';
import { getTodos } from './API/api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

class App extends React.Component {
  state = {
    allTodos: [],
    selectedUserId: 0,
    filteredTodos: [],
  };

  componentDidMount() {
    getTodos()
      .then(todos => this.setState({
        allTodos: todos,
        filteredTodos: [...todos],
      }));
  }

  updateUserId = (id) => {
    if (id !== this.state.selectedUserId) {
      this.setState({ selectedUserId: id });
    }
  }

  updateTodos = (arrTodos) => {
    this.setState({ filteredTodos: arrTodos });
  }

  render() {
    const { allTodos, filteredTodos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            allTodos={allTodos}
            filteredTodos={filteredTodos}
            updateUserId={this.updateUserId}
            updateTodos={this.updateTodos}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                updateUserId={this.updateUserId}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
