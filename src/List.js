import React from 'react';

import Content from './Content';

class List extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      listTodos: null,
      listUsers: null,
      isLoaded: false,
    };

    this.todos = this.todos.bind(this);
  }

  async todos() {
    this.setState({
      isLoaded: true,
    });
    const responseTodos = await fetch('https://jsonplaceholder.typicode.com/todos');
    const todos = await responseTodos.json();
    const responseUsers = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await responseUsers.json();
    this.setState({
      listTodos: todos,
      listUsers: users,
    });
  }
  
  render() {
    return (
      <>
        <button onClick={() => this.todos()}>Load</button>
        <Content state={this.state} />
      </>
    )
  }
}

export default List;
