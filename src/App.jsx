import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getData } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    showTodos: null,
    selectedUserId: 0,
  };

  componentDidMount() {
    getData('todos')
      .then(({ data }) => this.setState({ todos: [...data] }));
  }

  setSelectedUserId = (selectedUserId) => {
    if (selectedUserId !== this.state.selectedUserId) {
      this.setState({ selectedUserId });
    }
  };

  resetSelectedUserId = () => {
    this.setState({ selectedUserId: 0 });
  };

  setFilterByTitle = (fieldContent) => {
    this.setState(state => ({
      showTodos: fieldContent === ''
        ? null
        : state.todos.filter(todo => (
          String(todo.title).includes(fieldContent)
        )),
    }));
  };

  setDisplayBySelect = (selectedValue) => {
    this.setState(state => ({
      showTodos: selectedValue === 'all'
        ? null
        : state.todos.filter(todo => (
          String(todo.completed) === selectedValue)),
    }));
  }

  render() {
    const { todos, showTodos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          {this.state.selectedUserId}
          <TodoList
            todos={showTodos || todos}
            onUserSelect={this.setSelectedUserId}
            onChangeSearchField={this.setFilterByTitle}
            onChangeSelect={this.setDisplayBySelect}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId
              ? (
                <CurrentUser
                  userId={selectedUserId}
                  onClear={this.resetSelectedUserId}
                />
              )
              : 'No user selected'
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
