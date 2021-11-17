import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getAllTodos } from './api/api';

interface State {
  selectedUserId: number;
  todos: Todo[],
  title: string,
  completed: string,
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
    title: '',
    completed: 'not selected',
  };

  async componentDidMount() {
    const todos = await getAllTodos();

    this.setState({ todos });
  }

  onUserSelect = (userId: number) => {
    this.setState({ selectedUserId: userId });
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    this.setState({ [name]: value } as unknown as Pick<State, keyof State>);
  };

  prepareTodos = () => {
    const { todos, title, completed } = this.state;

    return todos.filter(todo => {
      if (title) {
        return todo.title.toLowerCase().includes(title.toLowerCase());
      }

      if (completed === 'completed') {
        return todo.completed;
      }

      if (completed === 'not completed') {
        return !todo.completed;
      }

      return todo;
    });
  };

  render() {
    const {
      selectedUserId,
      title,
      completed,
    } = this.state;

    const preparedTodos = this.prepareTodos();

    return (
      <div className="App">
        <div className="App__sidebar">
          {this.state.todos.length > 0
            && (
              <TodoList
                title={title}
                completed={completed}
                handleUserSelect={this.onUserSelect}
                todos={preparedTodos}
                onInputChange={this.handleInputChange}
              />
            )}
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser userId={selectedUserId} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
