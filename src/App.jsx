import React from 'react';
import './App.scss';
import './styles/general.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getAll } from './api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    getAll()
      .then((result) => {
        this.setState({
          todos: result.data,
        });
      });
  }

  checkedHandler = (todoID) => {
    this.setState((prevState) => {
      const item = prevState.todos.find(element => element.id === todoID);

      item.completed = !item.completed;

      return {
        todos: [...prevState.todos],
      };
    });
  }

  selectUserHandler = (userID) => {
    this.setState({ selectedUserId: userID });
  }

  resetHandler = () => {
    this.setState({ selectedUserId: 0 });
  }

  shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));

      // eslint-disable-next-line no-param-reassign
      [a[i], a[j]] = [a[j], a[i]];
    }

    this.setState({ todos: a });
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <Button
            onClick={() => this.shuffle(this.state.todos)}
          >
            Random
          </Button>
          <TodoList
            todos={todos}
            checkInput={this.checkedHandler}
            userID={this.selectUserHandler}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                resetHandler={this.resetHandler}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
