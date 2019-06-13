import React, { Component } from 'react';
import User from './User';

class TodoItem extends Component {
    
    render() {
        const currentUser =  this.props.users.find(person => person.id === this.props.item.userId);

        return (       
            <tr key={this.props.item.id}>
                <td>{this.props.item.title}</td>
                <td className={this.props.item.completed ? 
                'active' : 'still_pending'}>{this.props.item.completed ? 'Active' : 'Still pending'}</td>
                <td><User user={currentUser.name}/></td>
            </tr>
        );
    }
}

export default TodoItem;

