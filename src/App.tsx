import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { loadTodos } from './api';

interface State {
  todos: Todo[];
  selectedUserId: number;
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
  };

  async componentDidMount() {
    const data = await loadTodos();

    this.setState({
      todos: data,
    });
  }

  getSelectedUserId = (selectedUserId: number) => {
    this.setState({ selectedUserId });
  };

  todoStatusChanger = (todoId: number) => {
    this.setState(currentState => ({
      todos: currentState.todos.map(todo => {
        if (todo.id === todoId) {
          // eslint-disable-next-line no-param-reassign
          todo.completed = !todo.completed;
        }

        return todo;
      }),
    }));
  };

  clearUser = () => {
    this.setState({ selectedUserId: 0 });
  };

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos.slice(0, 10)}
            todoStatusChanger={this.todoStatusChanger}
            getSelectedUserId={this.getSelectedUserId}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {/* {selectedUserId ? ( */}
            <CurrentUser selectedUserId={selectedUserId} clearUser={this.clearUser} />
            {/* ) : 'No user selected'} */}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
