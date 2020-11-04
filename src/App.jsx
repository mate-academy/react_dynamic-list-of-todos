import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { SearchBar } from './components/SearchBar';
import { Select } from './components/Select';
import { Randomizer } from './components/Randomizer';
import { getTodos } from './api/api';

class App extends React.Component {
  state = {
    select: 'All',
    query: '',
    todos: [],
    selectedPost: 0,
    selectedUserId: 0,
  };

  componentDidMount() {
    getTodos()
      .then((todos) => {
        this.setState({
          todos: todos
            .filter(todo => todo.title !== '')
        });
      });

  }

  selectPost = (postId, userId) => {
    this.setState({ selectedUserId: userId,
      selectedPost: postId });
  }

  clear = () => {
    this.setState({
      selectedPost: 0,
      selectedUserId: 0,
    })
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  filterBySearch = (todos) => {
    const { query } = this.state;

    return todos.filter(({ title }) => (
      title.toLowerCase().includes(query.toLowerCase())
    ));
  }


  filterBySelect = (todos) => {
    const { select } = this.state;
    switch(select) {
      case 'All': return this.state.todos;
      case 'Active': return todos
        .filter(todo => !todo.completed)
      case 'Completed': return todos
      .filter(todo => todo.completed)
    }
  }

  filter(todos) {
    if(!todos) {
      const todos = this.filterBySelect(this.state.todos);
      return this.filterBySearch(todos);
    }
  }

  random = () => {
    this.setState(prevState => (
      {
        todos: [...prevState.todos]
          .sort(function(){
          return Math.random() - 0.5;
        })
      }
    ))
  }

  componentDidUpdate() {
    console.log(1);
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <h2>Todos:</h2>
          <div className="App__tools">
            <SearchBar
              handleChange={this.handleChange}
              value={this.state.query}
            />
            <Select changeHandler={this.handleChange} />
            <Randomizer clickHandler={this.random} />
          </div>
          <TodoList
            todos={this.filter()}
            selected={this.state.selectedPost}
            clickHandler={this.selectPost}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clickHandler={this.clear}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
