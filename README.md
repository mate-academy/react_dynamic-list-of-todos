
# React dynamic list of TODOs
The goal of this project is to load the data from server dynamically accordingly to what user select.
[DEMO LINK](https://sviatoslav-kishka.github.io/react_dynamic-list-of-todos/)

## Description 
- Todos are fetched on page load from [GET todos endpoint](https://mate-api.herokuapp.com/todos).
- Each todo has a button to select a user
- `CurrentUser` component receives `userId` as a prop and loads user details from [GET user endpoint](https://mate-api.herokuapp.com/users/1)
- If you select another user the details should be updated.
- If you select the same user there should not be a request to the server.
- A button `Clear` clears the selectedUser
- You can filter the todos by title
- You can filter todos by it's completion

## Local development
### Dependencies.
- Node v12.16.3 and higher
- NPM v6.14.4 and higher
### Installing.
- Fork and clone this repository
- Run npm install in your terminal
- Run npm start
## Troubleshooting
Any advise for common problems or issues. For any contributing or problem solving you could find me [here](https://www.linkedin.com/in/sviatoslav-kishka-a165981b0/)
