import React from 'react';

export const User = props => {
    const {
        name,
        email,
    } = props;
    
    return (
        <a href={`mailto:${email}`}>
            {name}
        </a>
    );
};