import React from 'react';
import './App.css';
import { getTodos, getUsers } from './Api';
import { Button } from 'semantic-ui-react';

import TodoList from './components/todoList/TodoList';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todoList: [],
      isLoading: false,
      hasError: false,
      dataReceived: false,
    }
  }

  getTodosWithUsers = (todos, users) => {

    return todos.map(todo => ({
      ...todo,
      user: users.find(user => todo.userId === user.id),
    }));
  }

  loadTodos = async () => {
    this.setState({ isLoading: true });
    Promise.all([getTodos(), getUsers()])
      .then(resolve => {
        this.setState({
          isLoading: false,
          hasError: false,
          dataReceived: true,
          todoList:  this.getTodosWithUsers(resolve[0], resolve[1]),
         })
      })
      .catch(() => {
        this.setState({ hasError: true })
      })
      .finally(() => {
        this.setState({ isLoading: false })
      })
  }

  render() {
    const { isLoading, dataReceived, todoList, hasError } = this.state;

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
          <TodoList todoList={todoList}/>
        </>
      )
    }
  }
}

export default App;
