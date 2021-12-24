import * as React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

interface State {
  selectedUserId: number;
  todos: Todo[],
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
  };

  async componentDidMount() {
    const newTodos = await getTodos();

    this.setState({ todos: [...newTodos] });
  }

  selectUser = (id: number) => {
    this.setState({ selectedUserId: id });
  };

  serchTodo(text: string) {
    this.setState((currentState) => ({
      todos: [...currentState.todos.filter(todo => todo.title.includes(text))],
    }));
  }

  render() {
    const { selectedUserId, todos } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectUser={this.selectUser}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <>
                <CurrentUser selectedUserId={selectedUserId} />
                <button
                  type="button"
                  className="button"
                  onClick={() => this.setState((currentState) => ({
                    selectedUserId: currentState.selectedUserId * 0,
                  }))}
                >
                  clear
                </button>
              </>
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
