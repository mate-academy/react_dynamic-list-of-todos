import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getAllTodos } from './API/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    getAllTodos()
      .then((todos) => {
        this.setState({ todos });
      });
  }

  checkedHandler = (todoId) => {
    this.setState((state) => {
      const item = [...state.todos].find(element => element.id === todoId);

      item.completed = !item.completed;

      return {
        todos: [...state.todos],
      };
    });
  }

  handlerSelectUserId = (userId) => {
    this.setState({
      selectedUserId: userId,
    });
  }

  clearSelectedUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            checkedHandler={this.checkedHandler}
            handlerSelectUserId={this.handlerSelectUserId}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clearSelectedUser={this.clearSelectedUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
