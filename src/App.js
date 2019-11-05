import React from 'react';
import './App.css';
import {
  Dimmer, Loader, Image, Segment, Button,
} from 'semantic-ui-react';
import { users, todos } from './api/api-todos';
import TodoList from './components/TodoList';
import Buttons from './components/Buttons';

class App extends React.Component {
  state = {
    todosList: null,
    isLoading: false,
    hasError: false,
    filter: 'Normal',
  };

  loadData = async() => {
    this.setState({
      isLoading: true,
    });

    Promise.all([todos, users])
      .then(([todosList, usersList]) => {
        this.setState(PrevState => ({
          todosList: todosList.map(todo => ({
            ...todo,
            user: usersList.find(user => user.id === todo.userId),
          })),
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
      todosList,
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

    if (!todosList) {
      return (
        <div className="before__load">
          <h2 className="before__load-text">WELCOME, YOU DON'T HAVE DATA YET</h2>
          <Button className="before__load-button" onClick={this.loadData} icon="play" content="Load Data" />
        </div>
      );
    }

    let filteredList = [...todosList];

    switch (filter) {
      case 'Normal':
        filteredList = todosList;
        break;
      case 'Todos':
        filteredList = [...todosList].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'Name':
        filteredList = [...todosList].sort((a, b) => a.user.name.localeCompare(b.user.name));
        break;
      case 'Status':
        filteredList = [...todosList].sort((a, b) => b.completed - a.completed);
        break;
      default:
        break;
    }

    return (
      <div className="App">
        <Buttons changeFilter={this.changeFilter} />
        <TodoList todos={filteredList} />
      </div>
    );
  }
}

export default App;
