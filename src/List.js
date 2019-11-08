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

    this.todos = this.todos.bind(this);
  }

  async todos() {
    this.setState({
      isLoaded: true,
    });
    const todos = await getData('https://jsonplaceholder.typicode.com/todos');
    const users = await getData('https://jsonplaceholder.typicode.com/users');
    this.setState({
      listTodos: todos.map(todo =>{
        return {...todo, user: users.find(user => todo.userId === user.id)};
      }),
    });
  }

  SortByName (sortBy) {
    this.setState({ sortBy });
  }

  render() {
    return (
      <>
        <div className={"button"}>
          <button hidden={this.state.isLoaded} onClick={() => this.todos()}>
            Load
          </button>
          <button
            disabled={this.state.sortBy === "Name"}
            onClick={() => this.SortByName("Name")}
          >
            Name
          </button>
          <button
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
