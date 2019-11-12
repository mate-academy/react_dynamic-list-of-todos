import React from 'react';

import Content from './Content';
import getData from './getData';

class List extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      listTodos: null,
      isLoaded: false,
      sortBy: null,
    };

    this.load = this.load.bind(this);
  };

  load = () => {
    this.setState({
      isLoaded: true
    });
    Promise.all([
      getData("https://jsonplaceholder.typicode.com/todos"),
      getData("https://jsonplaceholder.typicode.com/users")
    ]).then(([todosItems, usersItems]) => {
      const todoList = todosItems.map(todo => ({
        ...todo,
        user: usersItems.find(user => user.id === todo.userId)
      }));
      // console.log(todoList)
      this.setState({
        listTodos: todoList
      });
    });
  }

  SortByName (sortBy) {
    this.setState({ sortBy });
  }

  render() {
    return (
      <>
        <div className={"button"}>
          <button hidden={this.state.isLoaded} onClick={() => this.load()}>
            Load
          </button>
          <button
            hidden={!this.state.isLoaded}
            disabled={this.state.sortBy === "Name"}
            onClick={() => this.SortByName("Name")}
          >
            Name
          </button>
          <button
            hidden={!this.state.isLoaded}
            disabled={this.state.sortBy === "Status"}
            onClick={() => this.SortByName("Status")}
          >
            Status
          </button>
        </div>
        <Content list={this.state} />
      </>
    );
  }
}

export default List;
