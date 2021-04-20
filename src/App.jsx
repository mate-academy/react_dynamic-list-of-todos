import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/todos';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  async componentDidMount() {
    await getTodos()
      .then((todos) => {
        this.setState({
          todos,
        });
      });
  }

  selectUser = (selectedUserId) => {
    this.setState({ selectedUserId });
  }

  clearSelection = () => {
    this.setState({ selectedUserId: 0 });
  }

  changeCompleted = (todoId) => {
    this.setState(state => ({
      todos: state.todos.map((todo) => {
        const isCompleted = todo.completed;

        return (
          todo.id === todoId
            ? {
              ...todo, completed: !isCompleted,
            }
            : todo
        );
      }),
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
            selectedUserId={selectedUserId}
            changeCompleted={this.changeCompleted}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clearSelection={this.clearSelection}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
