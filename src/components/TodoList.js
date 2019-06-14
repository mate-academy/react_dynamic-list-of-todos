import React from 'react';
import { TodoItem } from './TodoItem';

export const TodoList = props => {
    const {
        todos
    } = props;
    // console.log(users);
    // const usersMap = users.reduce((acc, user) => ({...acc, [user.id]: user}), {});
    // console.log(usersMap);
    // const todosWithUsers = todos.map(todo => ({...todo, user: usersMap[todo.userId]}));
    // console.log(todosWithUsers);
    return (
        <table cellSpacing={20}>
            <tbody>
                {todos.map(todo => {
                    return (
                        <TodoItem key={todo.id} {...todo}/>
    );
})}
            </tbody>
        </table>
    );
};