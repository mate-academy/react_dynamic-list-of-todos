import _ from 'lodash';
import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { Button, Dimmer, Header } from 'semantic-ui-react';
import { getTodoList, getUserList } from './api';
import ToDoList from './components/toDoList/ToDoList';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toDoList: null,
      isLoading: false,
      hasError: false,
      column: null,
      direction: null,
    };

    this.loadData = this.loadData.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  loadData() {
    this.setState({
      isLoading: true,
      hasError: false,
    });

    Promise.all([getTodoList(), getUserList()])
      .then(([todos, users]) => {
        this.setState({
          toDoList: [...todos].map(todo => ({
            ...todo,
            user: users.find(user => user.id === todo.userId),
          })),
          isLoading: false,
        },);
      }).catch(() => {
        this.setState({
          isLoading: false,
          hasError: true,
        });
      });
  }

  handleSort(clickedColumn) {
    if (this.state.column !== clickedColumn) {
      this.setState(prevState => ({
        column: clickedColumn,
        toDoList: _.sortBy([...prevState.toDoList], [clickedColumn]),
        direction: 'ascending',
      }));

      return;
    }

    this.setState(prevState => ({
      toDoList: [...prevState.toDoList].reverse(),
      direction: prevState.direction === 'ascending'
        ? 'descending'
        : 'ascending',
    }));
  }

  render() {
    const { toDoList, hasError, isLoading } = this.state;
    if (hasError) {
      return (
        <Dimmer
          active
        >
          <Header as="h2" inverted>
            Something went wrong
          </Header>

          <Button
            loading={isLoading}
            onClick={this.loadData}
            primary
          >
            Try again
          </Button>
        </Dimmer>
      );
    }

    if (!toDoList) {
      return (
        <Dimmer
          active
        >
          <Header as="div" inverted>
            <h2>Welcome. Push button to proceed.</h2>
            <p>Click on table top to sort the list</p>
          </Header>

          <Button
            loading={isLoading}
            onClick={this.loadData}
            primary
          >
            Load data
          </Button>
        </Dimmer>
      );
    }

    return (
      <ToDoList data={this.state} sort={this.handleSort} />
    );
  }
}

export default App;
