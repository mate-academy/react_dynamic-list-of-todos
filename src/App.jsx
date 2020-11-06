import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    hasError: false,
    hasLoading: false,
    selectedUserId: 0,
  };

  async componentDidMount() {
    this.setState({ hasLoading: true });
    try {
      const todos = await getTodos()
        .then(todosData => todosData.data
          .filter(todo => todo.id
            && todo.userId
            && todo.title
            && todo.completed !== null));

      this.setState({
        todos,
        hasError: false,
        hasLoading: false,
      });
    } catch (error) {
      this.setState({
        hasError: true,
        hasLoading: false,
      });
    }
  }

  selectUser = (id) => {
    if (this.state.selectedUserId !== id) {
      this.setState({
        selectedUserId: id,
      });
    }
  }

  clearSelectedUser = () => {
    this.setState({ selectedUserId: 0 });
  }

  render() {
    const { todos, selectedUserId, hasError, hasLoading } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectUser={this.selectUser}
            selectedUserId={selectedUserId}
            hasError={hasError}
            hasLoading={hasLoading}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clear={this.clearSelectedUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
