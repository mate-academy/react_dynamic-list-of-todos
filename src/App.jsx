import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './components/api';

class App extends React.Component {
  state = {
    todos: [],
    filteredTodos: [],
    selectedUserId: 0,
    choosedByComplete: 'all',
  };

  componentDidMount() {
    getTodos()
      .then((todos) => {
        this.setState({
          todos,
          filteredTodos: todos,
        });
      });
  }

  getUserId = (userId) => {
    this.setState({ selectedUserId: userId });
  }

  selectByTitle = (text) => {
    this.setState(state => ({
      filteredTodos: state.todos
        .filter(todo => todo.title.toLowerCase()
          .includes(text.toLowerCase())),
    }));
  }

  selectByComplete = (option) => {
    this.setState({ choosedByComplete: option });
  }

  render() {
    const { filteredTodos, selectedUserId, choosedByComplete } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={filteredTodos}
            getUserId={this.getUserId}
            selectByTitle={this.selectByTitle}
            selectByComplete={this.selectByComplete}
            choosedByComplete={choosedByComplete}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
