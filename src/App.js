import React from 'react';
import './App.css';
import { Button } from 'semantic-ui-react';
import TodoList from './components/TodoList';
import Buttons from './components/buttons';
import { getTodo } from './API/getTodos';
import { getUsers } from './API/users';

function getTodosWithUsers(todosList, usersList) {
  return todosList.map(todo => ({
    ...todo,
    user: usersList.find(user => todo.userId === user.id),
  }));
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      todoList: [],
      isLoading: false,
      error: false,
      initialized: false,
      currentFilter: 'byUser',
    };
  }

  loadData = () => {
    this.setState({
      isLoading: true,
      error: false,
      initialized: true,
    });

    Promise.all([getTodo(), getUsers()])
      .then(([todoList, userList]) => {
        this.setState({
          todoList,
          userList,
        });
      })
      .catch(() => {
        this.setState({
          error: true,
          isLoading: false,
        });
      })
      .finally(() => {
        this.setState({
          isLoading: false,
          initialized: true,
        });
      });
  };

  filters = (e) => {
    const tab = e.target;
    const activefilter = tab.innerText;
    switch (activefilter) {
      case 'By User!':
        this.setState(prevState => ({
          ...prevState,
          currentFilter: 'byUser',
        }));
        break;
      case 'By Title!':
        this.setState(prevState => ({
          ...prevState,
          currentFilter: 'byTitle',
        }));
        break;
      case 'By Status!':
        this.setState(prevState => ({
          ...prevState,
          currentFilter: 'byStatus',
        }));
        break;
      default:
        this.setState(prevState => ({
          ...prevState,
          currentFilter: 'noFilters',
        }));
        break;
    }
  }

  render() {
    const {
      todoList, userList, isLoading, error,
    } = this.state;

    let todosOnDisplay;
    const preparedTodos = getTodosWithUsers(todoList, userList);

    switch (this.state.currentFilter) {
      case 'byUser':
        todosOnDisplay
        = preparedTodos.sort((a, b) => a.user.name.localeCompare(b.user.name));
        break;
      case 'byTitle':
        todosOnDisplay
        = preparedTodos.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'byStatus':
        todosOnDisplay
        = preparedTodos.sort((a, b) => a.completed - b.completed);
        break;
      default:
        todosOnDisplay = preparedTodos;
        break;
    }

    if (isLoading) {
      return <p>loading...</p>;
    }

    if (error) {
      return (
        <>
          <p>Error occurred!!!</p>
          <Button
            type="button"
            onClick={this.loadData}
            inverted
            color="red"
          >
            Try Again!
          </Button>
        </>
      );
    }

    if (todoList.length === 0 && userList.length === 0) {
      return (
        <>
          <p>No users and todos yet!</p>
          <Button type="button" onClick={this.loadData} color="green">
            Load
          </Button>
        </>
      );
    }

    return (
      <div className="App">
        <h1>Dynamic list of todos</h1>
        <Buttons filters={this.filters} />
        <TodoList todos={todosOnDisplay} />
      </div>
    );
  }
}

export default App;
