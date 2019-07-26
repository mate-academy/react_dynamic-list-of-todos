import React from 'react'

function ListItems(props) {
    let { todos, sortTodos } = props;

    return (
        <table className="table">
            <thead>
                <tr>
                    <th onClick={() => {
                        sortTodos('completed')
                    }}>Done</th>
                    <th onClick={() => {
                        sortTodos('title')
                    }}>Todo</th>
                    <th onClick={() => {
                        sortTodos('user')
                    }}>User</th>
                </tr>
            </thead>
            <tbody >
                {todos.map(todo => {
                    return <tr key={todo.id}>
                        <td>
                            <input type='checkbox' checked={todo.completed} onChange={() => []} />
                        </td>

                        <td>
                            {todo.title}
                        </td>

                        <td>
                            {todo.user.name}
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
    )
}

export default ListItems;