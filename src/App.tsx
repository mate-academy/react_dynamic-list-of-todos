import React from 'react';
import './styles/App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

interface State {
  selectedUserId: number,
  todos: Todo[],
}

export class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({ todos });
  }

  chooseUser = (userId: number) => {
    this.setState({ selectedUserId: userId });
  };

  unselectAll = () => {
    this.setState({
      selectedUserId: 0,
    });
  };

  checkTodo = (todoId: number) => {
    this.setState(({ todos }) => ({
      todos: todos.map(todo => {
        if (todo.id === todoId) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }),
    }));
  };

  render() {
    const { selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={this.state.todos}
            chooseUser={this.chooseUser}
            selectedUserId={selectedUserId}
            markTodo={this.checkTodo}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                selectedUserId={this.state.selectedUserId}
                unselectAll={this.unselectAll}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}
