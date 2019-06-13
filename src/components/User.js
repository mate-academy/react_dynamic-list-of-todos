import React, { Component } from 'react';

class User extends Component {

    render() {
        return (
            <>
               {this.props.user}
            </>
        );
    }
}

export default User;

