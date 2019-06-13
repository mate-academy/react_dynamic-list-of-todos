import React, { Component } from 'react';
import User from './User';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: null,
            loaded: false 
        };
    }
    componentDidMount() {
    
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://jsonplaceholder.typicode.com/users');
        let users = [];

        xhr.addEventListener('load', ()=> {
            users = JSON.parse(xhr.response);
           
            this.setState({
                users: users, 
                loaded: true
            });
        });
        xhr.send();
    }
    
    render() {
     
        if (!this.state.loaded) {
            return null;
        } else { 
            return ( 
                <>
                 <User users={this.state.users}/>
                </>
            );
        }
    }

}

export default Users;