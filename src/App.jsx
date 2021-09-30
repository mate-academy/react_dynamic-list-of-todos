import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getAllTodos } from './services/api';
import { Preloader } from './components/Preloader/Preloader';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    isLoading: true,
    inputValue: '',
    selectedValue: '',
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const todos = await getAllTodos();

    this.setState({
      isLoading: false,
    });

    this.setState({ todos });
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.inputValue !== this.state.inputValue) {
      const searchResult = await getAllTodos();
      const filteredTodos = searchResult
        .filter(el => el.title.toUpperCase()
          .search(this.state.inputValue.toUpperCase()) !== -1);

      this.setState({ todos: filteredTodos });
    }

    if (prevState.selectedValue !== this.state.selectedValue) {
      const searchResult = await getAllTodos();

      const filteredTodos = this.selectedFilter(
        this.state.selectedValue,
        searchResult,
      );

      this.setState({ todos: filteredTodos });
    }
  }

  selectedUserById = (selectedUserId) => {
    this.setState({ selectedUserId });
  }

  clearUsers = () => {
    this.setState({ selectedUserId: 0 });
  }

   onSearchHandler = (e) => {
     this.setState({ inputValue: e.target.value });
   }

   onSelectHandler = (e) => {
     this.setState({ selectedValue: e.target.value });
   }

   selectedFilter = (selectedValue, state) => {
     switch (selectedValue) {
       case 'completed':
         return state.filter(el => el.completed);
       case 'active':
         return state.filter(el => !el.completed);
       default:
         return state;
     }
   }

   render() {
     const {
       todos,
       selectedUserId,
       isLoading,
       inputValue,
       selectedValue,
     } = this.state;

     return (
       <div className="App">
         <div className="App__sidebar">
           <Preloader isLoading={isLoading} />
           {!isLoading && (
           <TodoList
             todos={todos}
             selectedUserById={this.selectedUserById}
             selectedUserId={selectedUserId}
             inputValue={inputValue}
             onSearchHandler={this.onSearchHandler}
             onSelectHandler={this.onSelectHandler}
             selectedValue={selectedValue}
           />
           )}
           <Preloader />
         </div>

         <div className="App__content">
           <div className="App__content-container">
             {selectedUserId
               ? (
                 <CurrentUser
                   userId={selectedUserId}
                   clearUsers={this.clearUsers}
                 />
               ) : 'No user selected'}
           </div>
         </div>
       </div>
     );
   }
}

export default App;
