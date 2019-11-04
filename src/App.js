import React from 'react';
import './App.css';
import {
  Dimmer, Loader, Image, Segment, Button,
} from 'semantic-ui-react';
import { getTodos } from './api/todos';
import { getUsers } from './api/users';
import TodoList from './components/TodoList';
import Buttons from './components/Buttons';

class App extends React.Component {
  state = {
    todolist: null,
    users: null,
    isLoading: false,
    hasError: false,
    filter: 'Normal',
  };

  loadData = async() => {
    this.setState({
      isLoading: true,
    });

    Promise.all([getTodos(), getUsers()])
      .then(([todos, users]) => {
        this.setState(PrevState => ({
          todolist: todos,
          users,
          isLoading: false,
          hasError: false,
        }));
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          hasError: true,
        });
      });
  };

  changeFilter = (filterName) => {
    this.setState({ filter: filterName });
  };

  render() {
    const {
      todolist,
      users,
      isLoading,
      hasError,
      filter,
    } = this.state;

    if (isLoading) {
      return (
        <Segment id="loader">
          <Dimmer active inverted>
            <Loader inverted content="Preparing Todos" />
          </Dimmer>

          <Image src="/images/wireframe/short-paragraph.png" />
        </Segment>
      );
    }

    if (!isLoading && hasError) {
      return (
        <div className="load__fail">
          <h2> IF YOU SEE THIS, SOMETHING GOT WRONG, TRY TO RELOAD</h2>
          <Button className="before__load-button" onClick={this.loadData} negative>RELOAD</Button>
        </div>
      );
    }

    if (!todolist && !users) {
      return (
        <div className="before__load">
          <h2 className="before__load-text">WELCOME, YOU DON'T HAVE DATA YET</h2>
          <Button className="before__load-button" onClick={this.loadData} icon="play" content="Load Data" />
        </div>
      );
    }

    let filteredList = [...todolist];
    let filteredUsers = [...users];

    switch (filter) {
      case 'Normal':
        filteredList = todolist;
        filteredUsers = users;
        break;
      case 'Todos':
        filteredList = [...todolist].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'Name':
        filteredUsers = [...users].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Status':
        filteredList = [...todolist].sort((a, b) => b.completed - a.completed);
        break;
      default:
        break;
    }

    return (
      <div className="App">
        <Buttons changeFilter={this.changeFilter} />
        <TodoList users={filteredUsers} todos={filteredList} />
      </div>
    );
  }
}

export default App;
