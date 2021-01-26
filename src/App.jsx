import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getAllTodos } from './api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    getAllTodos()
      .then(todos => (
        this.setState({ todos: todos.data.filter(task => task.title) })));
  }

  selectUser = (id) => {
    this.setState({ selectedUserId: id });
  }

  clearUser = () => {
    this.setState({ selectedUserId: 0 });
  }

  filterTask = (query) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(task => task.title.includes(query)),
    }));
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectUser={this.selectUser}
            filter={this.filterTask}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser userId={selectedUserId} clear={this.clearUser} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
