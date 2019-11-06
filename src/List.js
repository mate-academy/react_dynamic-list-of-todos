import React from 'react';

import Content from './Content';
import getUrl from './getUrl';

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
    const todos = await getUrl('https://jsonplaceholder.typicode.com/todos');
    const users = await getUrl('https://jsonplaceholder.typicode.com/users');
    this.setState({
      listTodos: todos,
      listUsers: users,
    });
  }

  render() {
    return (
      <>
        <button hidden={this.state.isLoaded} onClick={() => this.todos()}>
          Load
        </button>
        <Content list={this.state} />
      </>
    );
  }
}

export default List;
