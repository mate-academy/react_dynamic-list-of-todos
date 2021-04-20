import React from 'react';
import './App.scss';
import './styles/general.scss';
import { getTodos, getUser } from './api/api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

class App extends React.Component {
  state = {
    todos: [],
    userInfo: null,
    selectedUserId: -1,
  };

  async componentDidMount() {
    const todosFromServer = await getTodos();

    this.setState({ todos: todosFromServer.data });
  }

  selectUser = (newUserId) => {
    this.setState((state) => {
      if (state.selectedUserId !== newUserId) {
        this.updateUserInfo(newUserId);

        return { selectedUserId: newUserId };
      }

      return state;
    });
  }

  completeTodo = (todoId) => {
    this.setState((prevState) => {
      const updatedTodos = prevState.todos
        .map(todo => ((todo.id !== todoId)
          ? { ...todo }
          : {
            ...todo, completed: !todo.completed,
          }));

      return {
        todos: updatedTodos,
      };
    });
  }

  clearSelection = () => {
    this.setState(
      {
        selectedUserId: -1,
        userInfo: null,
      },
    );
  }

  async updateUserInfo(newUserId) {
    if (newUserId >= 0) {
      const info = await getUser(newUserId);

      this.setState({
        userInfo: info ? info.data : info,
      });
    }
  }

  render() {
    const { todos, userInfo } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectedId={userInfo ? userInfo.id : 0}
            selectionChanged={this.selectUser}
            todoCompleted={this.completeTodo}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {userInfo ? (
              <CurrentUser user={userInfo} deselectUser={this.clearSelection} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
