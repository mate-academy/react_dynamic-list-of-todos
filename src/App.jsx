import React from 'react';
import './App.scss';
import './styles/general.scss';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { SearchBar } from './components/SearchBar';
import { Select } from './components/Select';
import { Randomizer } from './components/Randomizer';
import { getTodos } from './api/api';

class App extends React.Component {
  state = {
    filterType: 'All',
    searchQuery: '',
    todos: [],
    selectedPostId: 0,
    selectedUserId: 0,
    isLoading: true,
    hasLoadinsErros: false,
  };

  componentDidMount() {
    getTodos()
      .then((todos) => {
        try {
          this.setState({
            todos: todos
              .filter(todo => !!todo.title),
            isLoading: false,
          });
        } catch {
          this.setState({ hasLoadinsErros: true });
        }
      });
  }

  handleSelectPost = (postId, userId) => {
    this.setState({
      selectedUserId: userId,
      selectedPostId: postId,
    });
  }

  clearSelectedUser = () => {
    this.setState({
      selectedPostId: 0,
      selectedUserId: 0,
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  filterBySearch = (todos) => {
    const { searchQuery } = this.state;

    return todos.filter(({ title }) => (
      title.toLowerCase().includes(searchQuery.toLowerCase())
    ));
  }

  filterBySelect = (todos) => {
    const { filterType } = this.state;

    switch (filterType) {
      case 'All': return this.state.todos;
      case 'Active': return todos
        .filter(todo => !todo.completed);
      case 'Completed': return todos
        .filter(todo => todo.completed);
      default: break;
    }

    return this.state.todos;
  }

  randomSortTodos = () => {
    this.setState(prevState => (
      {
        todos: [...prevState.todos]
          .sort(() => Math.random() - 0.5),
      }
    ));
  }

  loader = () => (
    <Loader
      className="App__loader"
      type="Oval"
      color="#4d457b"
      height={70}
      width={70}
      timeout={1500}
    />
  )

  filter() {
    const todos = this.filterBySelect(this.state.todos);

    if (this.state.searchQuery !== '' && this.state.todos !== null) {
      return this.filterBySearch(todos);
    }

    return todos;
  }

  render() {
    const {
      selectedUserId,
      isLoading,
      hasLoadinsErros,
    } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <h2>Todos:</h2>
          <div className="App__tools">
            <SearchBar
              handleChange={this.handleChange}
              value={this.state.searchQuery}
            />
            <Select changeHandler={this.handleChange} />
            <Randomizer clickHandler={this.randomSortTodos} />
          </div>
          {isLoading ? this.loader()
            : (
              <TodoList
                todos={this.filter()}
                selected={this.state.selectedPostId}
                handleSelectPost={this.handleSelectPost}
              />
            )
          }
          {hasLoadinsErros && (<h1> Error </h1>)}
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clickHandler={this.clearSelectedUser}
                loader={this.loader}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
