import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

const URL = 'https://mate-api.herokuapp.com';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    this.allData();
  }

  getTodos = async() => {
    const response = await fetch(`${URL}/todos`);
    const result = await response.json();

    return result.data;
  };

  selectedUser = (id) => {
    this.setState({ selectedUserId: id });
  }

  allData() {
    this.getTodos().then(todos => this.setState({ todos }));
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList todos={todos} selectedUser={this.selectedUser} />
          {this.allData()}
          {console.log(this.state.todos)}
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser userId={selectedUserId} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;


