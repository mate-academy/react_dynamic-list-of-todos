import React from 'react';
import './App.css';
import TodoList from './Components/TodoList'

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      todos: [],
      users: [],
      isLoaded: false,
      disabled: false,
      filerParam: null,
      value: null
    }

    this.loadData = async () => {
      const url = 'https://jsonplaceholder.typicode.com/';
      const response = await fetch(`${url}todos`);
      const todos = await response.json();

      const response2 = await fetch(`${url}users`);
      const users = await response2.json();

      this.setState({ todos, users });

    }

    this.onLoad = () => {
      this.setState(prevState => {
        return {
          disabled: !prevState.disabled
        }
      });
      this.loadData().then(this.setState({ isLoaded: true }))
      console.log(this.state);
    }

    ///then variant1
    //const url = 'https://jsonplaceholder.typicode.com/';
    // Promise.all([
    //  fetch(`${url}todos`)
    //    .then(response => { response.json()
    //    .then(data => {this.setState{todos:data}})
    //  }),
    //  fetch(`${url}users`)
    //    .then(response => { response.json()
    //    .then(data => {this.setState{users:data}})
    //  })
    // ].then(this.setState.isloaded = true)


    /// then variant2
    // let datas = ['todos', 'uders'];
    // let requests = names.map(data => fetch(`https://jsonplaceholder.typicode.com/${data}`));
    // Promise.all(requests)
    //   .then(responses => {
    //     for (let response of responses) {
    //       alert(`${response.url}: ${response.status}`); // shows 200 for every url
    //     }
    //     return responses;
    //   })
    //   .then(responses => Promise.all(responses.map(r => r.json())))
    //   .then(data => datas.forEach(data => this.setState{data}));

    // this.sortBy((param) => {
    //   this.setState = { filerParam: param };

    //   this.setState(prevState => {
    //     const copy = { ...prevState[prevState.filerParam] };
    //     copy.sort((a, b) => a.title.localeCompare(b.title));
    //     console.log(param);
    //     return { [prevState.filerParam]: copy };
    //   })
    // })
  }
  render() {
    return (
      <div className="App">
        <header>
          <h1 style={{ textTransform: 'uppercase' }}>Todos list</h1>
        </header>
        {this.state.isLoaded
          ? <TodoList todos={this.state.todos} users={this.state.users} sorting={this.sortBy} />
          : <button onClick={this.onLoad} className="btn_load" disabled={this.state.disabled}>{this.state.disabled ? "Loading..." : "Load"}</button>}
      </div>
    );
  }
}


export default App;
