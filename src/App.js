import React from 'react';
import './App.css';
import { Button } from 'semantic-ui-react';
import TodoList from './components/TodoList';
import { getTodo, getUsers } from './API/getTodos';

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
      currentSorter: 'byUser',
      preparedTodos: null,
      todosOnDisplay: [],
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
          preparedTodos: getTodosWithUsers(todoList, userList),
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

  switcher = (sorter) => {
    switch (sorter) {
      case 'byUser':
        this.setState(prevState => ({
          ...prevState,
          currentSorter: 'byUser',
          preparedTodos: prevState.preparedTodos.sort(
            (a, b) => a.user.name.localeCompare(b.user.name)
          ),
        }));
        break;
      case 'byTitle':
        this.setState(prevState => ({
          ...prevState,
          currentSorter: 'byTitle',
          preparedTodos: prevState.preparedTodos.sort(
            (a, b) => a.title.localeCompare(b.title)
          ),
        }));
        break;
      case 'byStatus':
        this.setState(prevState => ({
          ...prevState,
          currentSorter: 'byTitle',
          preparedTodos: prevState.preparedTodos.sort(
            (a, b) => a.completed - b.completed
          ),
        }));
        break;
      default:
        this.setState(prevState => ({
          ...prevState,
          preparedTodos: prevState.preparedTodos,
        }));
        break;
    }
  }

  render() {
    const {
      isLoading, error, preparedTodos,
    } = this.state;

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
          >
            Try Again!
          </Button>
        </>
      );
    }

    if (!preparedTodos) {
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
        <Button
          type="button"
          onClick={() => this.switcher('byTitle')}
        >
          By User!
        </Button>
        <Button
          type="button"
          onClick={() => this.switcher('byUser')}
        >
          By Title!
        </Button>
        <Button
          type="button"
          onClick={() => this.switcher('byStatus')}
        >
          By Status!
        </Button>
        <TodoList todos={preparedTodos} />
      </div>
    );
  }
}

export default App;
