import React, { Component } from 'react';
import TodoList from './TodoList';

class Todos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            button: false,
            todos: null,
            users: null
        };
    this.getTodos = this.getTodos.bind(this);
    }
      
    downloadTodos() {
    
        const xhr = new XMLHttpRequest();
        
        xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos');
        let todos = [];

        xhr.addEventListener('load', ()=> {
            todos = JSON.parse(xhr.response);
           
            this.setState({
                todos: todos
            });
        });
        xhr.send();

    }
   
    downloadUsers() {

        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://jsonplaceholder.typicode.com/users');
        let users = [];

        xhr.addEventListener('load', ()=> {
            users = JSON.parse(xhr.response);
           
            this.setState({
                users: users
            });
        });
        xhr.send();
    }
       
    getTodos() {       
        this.setState({
            button: true            
        });
        this.downloadUsers();
        this.downloadTodos();
    }
           
    render() {
        
        if (!this.state.button) {
            return (
                <button onClick={this.getTodos}>
                    Show todos
                </button>
            );
        } else if (!this.state.todos || !this.state.users) {
            return <button>Loading</button>;
        } else { 
            return ( 
                <TodoList todos={this.state.todos} users={this.state.users}/>
            );
        }
    }
}
export default Todos;

