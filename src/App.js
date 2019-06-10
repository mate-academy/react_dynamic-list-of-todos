import React, {Component} from 'react';
import './App.css';
import TodoList from './components/TodoList';
import Service from './components/service';


class App extends Component {
    service = new Service();
    state = {
        users: null,
        todos: null,
        loaded: false,
        isLoading: false
    };

     downloadData = async () => {
         this.setState(state => {
             return {
                 ...state,
                 isLoading: true
             }
         });
         const usersPromice = this.service.getUsers();
         const todosPromice = this.service.getTodos();
         await Promise.all([usersPromice, todosPromice])
            .then(values => {
                    this.setState(state => {
                        return {
                            ...state,
                            users: values[0],
                            todos: values[1],
                            loaded: true,
                            isLoading: false
                        }
                    })
                });
    };

    render() {
        if (!this.state.loaded && !this.state.isLoading) {
            return (
                <button onClick={this.downloadData}>
                    Load
                </button>
            )
        }
        if (this.state.isLoading) {
            return (
                <button disabled={true}>
                    Loading...
                </button>
            )
        }
        if (this.state.loaded) {
            return (
                <TodoList
                    users={this.state.users}
                    todos={this.state.todos}

                />
            );
        }
    }
}

export default App;

