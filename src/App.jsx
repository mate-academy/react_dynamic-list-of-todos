import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './helpers';

class App extends React.Component {
  state = {
    allTodos: [],
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    getTodos().then((allTodos) => {
      this.setState({
        allTodos,
        todos: allTodos,
      });
    });
  }

  handleSelectedUser = (currentId) => {
    this.setState({ selectedUserId: currentId });
  }

  handleClearUserField = () => {
    this.setState({ selectedUserId: 0 });
  }

  handleFilterBySearching = (value) => {
    const { allTodos } = this.state;

    this.setState({
      todos: allTodos.filter(todo => todo.title.includes(value)),
    });
  }

  handleSelectFilter = (value) => {
    const { allTodos } = this.state;
    let filteredTodos = allTodos;

    switch (value) {
      case 'all':
        filteredTodos = allTodos;
        break;
      case 'active':
        filteredTodos = allTodos.filter(todo => todo.completed === false);
        break;
      case 'complited':
        filteredTodos = allTodos.filter(todo => todo.completed);
        break;
      default:
        return;
    }

    this.setState({ todos: filteredTodos });
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            handleSelectedUser={this.handleSelectedUser}
            handleFilterBySearching={this.handleFilterBySearching}
            handleSelectFilter={this.handleSelectFilter}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                handleClearUserField={this.handleClearUserField}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
