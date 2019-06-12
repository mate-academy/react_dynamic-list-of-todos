import React, { Component } from 'react';
import './App.css';
import TodoList from "./components/TodoList/TodoList";
import Filters from './components/Filters/Filters';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todosData: null,
      filteredTodosData: null,
      isDataLoaded: null,
      filters: {
        title: '',
        showingWithStatus: 'All',
        name: ''
      }
    };

    this.toggleStatus = this.toggleStatus.bind(this);
    this.handleLoadDataClick = this.handleLoadDataClick.bind(this);
    this.handleFiltersChanges = this.handleFiltersChanges.bind(this);
  }

  handleLoadDataClick() {
    const todosURL = 'https://jsonplaceholder.typicode.com/todos';
    const usersURL = 'https://jsonplaceholder.typicode.com/users';
    const xhrTodos = new XMLHttpRequest();
    const xhrUsers = new XMLHttpRequest();
    let todos = null;
    let users = null;
    const setInitialTodosData = () => {
      const usersObject = users.reduce(
        (acc, person) => ({...acc, [person.id]: person}),
        {}
      );
      const todosData = todos.map(item => {
        const {
          id, userId, title, completed
        } = item;

        return { id, title, completed, user: usersObject[userId] };
      });

      this.setState({
        todosData: [ ...todosData ],
        filteredTodosData: [ ...todosData ],
        isDataLoaded: true
      });
    };

    if (this.state.isDataLoaded === null) this.setState( {
      isDataLoaded: false
    });

    xhrTodos.open('GET', todosURL);
    xhrUsers.open('GET', usersURL);
    xhrTodos.responseType = 'json';
    xhrUsers.responseType = 'json';
    xhrTodos.send();
    xhrUsers.send();

    xhrTodos.addEventListener('load', () => {
      if (xhrTodos.readyState === 4) {
        todos = xhrTodos.response;
        if (users !== null) {
          setInitialTodosData();
        }
      }
    });
    xhrUsers.addEventListener('load', () => {
      if (xhrTodos.readyState === 4) {
        users = xhrUsers.response;
        if (todos !== null) {
          setInitialTodosData();
        }
      }
    });
  };

  toggleStatus(toggledItemId) {
    this.setState(prevState => {
      const {
        todosData, filters: { title, name, showingWithStatus }
      } = prevState;
      const newTodos = todosData.map(item => {
        const { id, title, user } = item;
        let { completed } = item;

        if (id === toggledItemId) completed = !completed;

        return {
          id: id,
          title: title,
          completed: completed,
          user: user
        }
      });

      return {
        todosData: newTodos,
        filteredTodosData: newTodos.filter(
          todo => {
            return  todo.title.includes(title)
              && (
                showingWithStatus !== 'All'
                  ? todo.completed === (showingWithStatus === 'Done')
                  : true
              )
              && todo.user.name.includes(name);
          }
        )
      }
    });
  }

  handleFiltersChanges(filterName, value) {
    this.setState(
      prevState => {
        const newFilters = {
          ...prevState.filters,
          [filterName]: value
        };

        return {
          filteredTodosData: prevState.todosData.filter(
            ({ title, completed, user: { name } }) => {
              return  title.includes(newFilters.title)
                && (
                  newFilters.showingWithStatus !== 'All'
                    ? completed === (
                        newFilters.showingWithStatus === 'Done'
                      )
                    : true
                )
                && name.includes(newFilters.name);
            }
          ),
          filters: { ...newFilters }
        }
      }
    );
  }

  render() {
    const {
      filteredTodosData,
      isDataLoaded,
      filters
    } = this.state;

    return (
      <div>
        <h1>ToDo. . .</h1>
        {
          isDataLoaded
            ? (
              <Filters
                filters={filters}
                names={
                  [
                    ...(new Set(
                      [
                        ...filteredTodosData.map(
                          ({ user: { name } }) => name
                        ),
                        filters.name,
                        ''
                      ]
                    ))
                  ]
                }
                onFiltersChange={this.handleFiltersChanges}
              />
            ) : ''
        }
        <TodoList
          loaded={isDataLoaded}
          todosData={filteredTodosData}
          loadDataClick={this.handleLoadDataClick}
          handleCompletedChange={this.toggleStatus}
        />
      </div>
    );
  }
}
