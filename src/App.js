import React from 'react';
import './App.css';
import TodoList from './Components/TodoList'

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      todos: [],
      isLoaded: false,
      disabled: false,
      filerParam: null,
      value: 'defaultValue'
    }

    this.loadData = async () => {
      const url = 'https://jsonplaceholder.typicode.com/';
      const response = await fetch(`${url}todos`);
      const todos = await response.json();

      const response2 = await fetch(`${url}users`);
      const users = await response2.json();

      const todosUsers = todos.map((item) => {

        users.forEach(element => {
          if (item.userId === element.id) {
            item = { ...element, ...item };
          }
        });
        return item
      })
      console.log(todosUsers);

      this.setState({ todos: todosUsers });
    }

    this.onLoad = () => {
      this.setState(prevState => {
        return {
          disabled: !prevState.disabled
        }
      });
      setTimeout(() => {
        this.loadData().then(this.setState({ isLoaded: true }))
      }, 500)
    }

    this.sortBy = (event) => {
      let targetValue = event.target.value;

      this.setState(prevState => {
        const copy = [...prevState.todos];
        targetValue === 'todos'
          ? copy.sort((a, b) => a.title.localeCompare(b.title))
          : copy.sort((a, b) => a.name.localeCompare(b.name));

        return {
          filterParam: targetValue,
          todos: copy
        };
      })
    }
  }
  render() {
    return (
      <div className="App">
        <header>
          <h1 style={{ textTransform: 'uppercase' }}>Todos list</h1>
        </header>
        {this.state.isLoaded ? (
          <TodoList
            todos={this.state.todos}
            value={this.state.value}
            sortBy={this.sortBy}
          />
        ) : (
            <button
              onClick={this.onLoad}
              className="btn_load"
              disabled={this.state.disabled}
            >
              {this.state.disabled ? "Loading..." : "Load"}
            </button>
          )}
      </div>
    );
  }
}


export default App;










    // /then variant1
    // const url = 'https://jsonplaceholder.typicode.com/';
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
