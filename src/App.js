import React from 'react';
import TodoList from "./components/TodoList";
import "./App.css"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: false,
      display: 'invisible'
    }

    this.getData = this.getData.bind(this)
  }

  getData(event) {
    event.target.classList.add(this.state.display);
    this.setState({
      list: true,
    });
  }
  
  render() {
    return(
      <div>
        <button className = "get" onClick = {this.getData}>Get data</button>
        {this.state.list ? <TodoList />: null}
      </div>
    )
  }
}

export default App;
