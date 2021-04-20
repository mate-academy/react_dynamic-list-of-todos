import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    getTodos()
      .then((todos) => {
        this.setState({ todos });
      });
  }

  selectUser = (userId) => {
    this.setState({
      selectedUserId: userId,
    });
  }

  deleteUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  changeStatus = (todoId) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => ((todo.id === todoId)
        ? {
          ...todo, completed: !todo.completed,
        }
        : { ...todo })),
    }));
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        {todos.length > 0 && (
          <div className="App__sidebar">
            <TodoList
              todos={todos}
              selectedUserId={selectedUserId}
              selectUser={this.selectUser}
              changeStatus={this.changeStatus}
            />
          </div>
        )}

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                deleteUser={this.deleteUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
