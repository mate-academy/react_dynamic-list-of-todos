import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

interface State {
  selectedUserId: number | null;
  todos: Todo[],
  titleToSearch: string,
  completeStatus: string
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
    titleToSearch: '',
    completeStatus: '',
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState(
      { todos },
    );
  }

  selectUser = (userId: number) => {
    if (userId !== this.state.selectedUserId) {
      this.setState({
        selectedUserId: userId,
      });
    }
  };

  clearSelectedUser = () => {
    this.setState({
      selectedUserId: null,
    });
  };

  handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    this.setState(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value.toLowerCase(),
    }));
  };

  preparedTodos = () => {
    const { todos, titleToSearch, completeStatus } = this.state;

    return todos.filter(todo => {
      if (titleToSearch) {
        return todo.title.toLowerCase().includes(titleToSearch);
      }

      return todo;
    }).filter(todo => {
      if (completeStatus === 'completed') {
        return todo.completed;
      }

      if (completeStatus === 'not completed') {
        return todo.completed === false;
      }

      return todo;
    });
  };

  render() {
    const { selectedUserId, titleToSearch, completeStatus } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            titleToSearch={titleToSearch}
            completeStatus={completeStatus}
            todos={this.preparedTodos()}
            selectUser={this.selectUser}
            handleInputChange={this.handleInputChange}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clearSelection={this.clearSelectedUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
