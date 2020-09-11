import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './components/API/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: '',
    filter: '',
  };

  componentDidMount() {
    getTodos(this.state.filter)
      .then(todos => this.setState({ todos }));
  }

  setFilter = filter => this.setState({ filter });

  selectUser = id => this.setState({ selectedUserId: id });

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            filter={this.state.filter}
            todos={todos}
            selectUser={this.selectUser}
            setFilter={this.setFilter}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                selectUser={this.selectUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
