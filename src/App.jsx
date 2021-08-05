import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './utils/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 10,
  };

  componentDidMount() {
    getTodos()
      .then((todos) => {
        this.setState({
          todos: todos.data.filter(
            todo => todo.title && todo.userId,
          ),
        });
      });
  }

  selectUser = (selectedUserId) => {
    this.setState({ selectedUserId });
  }

  render() {
    const { todos, selectedUserId } = this.state;
    const { selectUser } = this;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectUser={selectUser}
          />
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
