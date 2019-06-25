import React from 'react';
import { User } from './User';

export const TodoItem = props => {
    const {
        title,
        //completed,
        user,
    } = props;

    return (
        <tr>
            <td>
                <h3>{title}</h3>
            </td>
            <td>
            <User {... user}/>
            </td>
        </tr>
        
    );
};