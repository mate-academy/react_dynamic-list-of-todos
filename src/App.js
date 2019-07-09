import React from 'react';
import './Styles/App.css';
import TodoList from './TodoList';
import getFromServer from './Get';
class App extends React.Component {
  state = {
    unitedData: [],
    isLoaded: false,
    isLoading: false,
  }

   handleLoad = async() => {
     this.setState({
       isLoading: true,
     });

     const userWithTodo = await getFromServer();

         setTimeout(() => {
           this.setState({
             unitedData: userWithTodo,
             isLoaded: true,
             isLoading: false,
       });
     }, 2000);
   }

  sortData = (event) => {
    const {value} = event.target;
    if (value === 'name') {
      this.setState({
        unitedData: this.state.unitedData.sort((a, b) =>
          String(a.user.name).localeCompare(String(b.user.name))),
      });
    }

    else {this.setState({
      unitedData: this.state.unitedData.sort((a, b) =>
        String(a[value]).localeCompare(String(b[value]))),
      });
    }
  };

  render() {
    if (!this.state.isLoaded) {
      return (
        <button
          type="button"
          className="load-button"
          onClick={this.handleLoad}
        >
          {this.state.isLoading ? 'Loading...' : 'Load'}
        </button>
      );
    }

    return (
      <div>
        <div className="App">
          <h1 className="app-title">Dynamic list of todos</h1>
          <select
            className="app-select"
            defaultValue="this.state.value"
            onChange={this.sortData}
          >
            <option value="" >Sort by: </option>
            <option value="name" >User </option>
            <option value="title" >Title </option>
            <option value="completed" >Status </option>
          </select>
        </div>
        <TodoList
          data={this.state.unitedData}
        />
      </div>
    );
  }
}

export default App;
