import React from 'react';
import './App.scss';
import './styles/general.scss';
import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({ todos });
  }

 selectUser = (selectedUserId) => {
   this.setState({ selectedUserId });
 }

 clearUser = () => {
   this.setState({ selectedUserId: 0 });
 }

 render() {
   const { todos, selectedUserId } = this.state;

   return (
     <div className="App">
       <div className="App__sidebar">
         {todos.length === 0 ? 'NoTodos' : (
           <TodoList
             todos={todos}
             onSelecUser={this.selectUser}
             selectedUserId={selectedUserId}
           />
         )}
       </div>

       <div className="App__content">
         <div className="App__content-container">
           {selectedUserId ? (
             <CurrentUser
               userId={selectedUserId}
               onClear={this.clearUser}
             />
           ) : 'No user is selected'}
         </div>
       </div>
     </div>
   );
 }
}

export default App;
