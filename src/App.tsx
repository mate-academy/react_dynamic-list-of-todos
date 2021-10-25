import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

interface State {
  selectedUserId: number;
  todos: Todo[],
  todoTitle: string,
  status: string,
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
    todoTitle: '',
    status: 'all',
  };

  componentDidMount() {
    getTodos()
      .then(todos => {
        this.setState({ todos });
      });
  }

  selectUserId = (id: number) => {
    this.setState({
      selectedUserId: id,
    });
  };

  searchTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      todoTitle: event.target.value,
    });
  };

  selectStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      status: event.target.value,
    });
  };

  render() {
    const {
      selectedUserId,
      todos,
      todoTitle,
      status,
    } = this.state;

    let visibleTodos: Todo[] = todos
      .filter(todo => todo.title.toLowerCase().includes(todoTitle.toLowerCase()));

    switch (status) {
      case 'active':
        visibleTodos = visibleTodos.filter(todo => !todo.completed);
        break;
      case 'completed':
        visibleTodos = visibleTodos.filter(todo => todo.completed);
        break;
      default:
        break;
    }

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={visibleTodos}
            selectedUserId={selectedUserId}
            onSelectedUserId={this.selectUserId}
            todoTitle={todoTitle}
            onSearch={this.searchTitle}
            status={status}
            onSelectStatus={this.selectStatus}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                selectedUserId={selectedUserId}
                onCleared={this.selectUserId}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
