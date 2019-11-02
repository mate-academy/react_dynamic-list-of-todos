import React from 'react';
import './App.css';
import { getTodos, getUsers } from './Api';
import { Button } from 'semantic-ui-react';

import TodoList from './components/todoList/TodoList';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      users: [],
      isLoading: false,
      hasError: false,
      dataReceived: false,
    }
  }

  loadTodos = async () => {
    this.setState({ isLoading: true });
    const [ todos, users ] = await Promise.all([getTodos(), getUsers()])
      .catch(() => {
        this.setState({ hasError: true })
      })
      .finally(() => {
        this.setState({ isLoading: false })
      })

    this.setState({
      todos: todos,
      users: users,
      isLoading: false,
      hasError: false,
      dataReceived: true,
    })
  }

  render() {
    const { isLoading, dataReceived, todos, users, hasError } = this.state;

    if (!dataReceived && !hasError) {
      return (
        <div className="start-button">
          {
            isLoading
            ? <Button loading secondary></Button>
            : <Button secondary onClick={this.loadTodos}>Load</Button>
          }
        </div>
      )
    } else if (hasError) {

      return (
        <>
          <div className="start-button">
            <h3>Sorry! We have some problem with connection to server, please click on button again.</h3>
              {
                isLoading
                ? <Button loading secondary></Button>
                : <Button secondary onClick={this.loadTodos}>Load</Button>
              }
          </div>
        </>
      );
    } else {

      return (
        <>
          <TodoList todos={todos} users={users} />
        </>
      )
    }
  }
}

export default App;
