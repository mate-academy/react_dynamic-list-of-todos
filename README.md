# React dynamic list of TODOs
- Replace `<your_account>` with your Github username in the
  [DEMO LINK](https://savmary.github.io/react_dynamic-list-of-todos/)
- Follow the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline)
- Use [React TypeScript cheat sheet](https://mate-academy.github.io/fe-program/js/extra/react-typescript)

## Description
You are given a basic markup for the App, TodosList and CurrentUser components and [the API](https://mate-academy.github.io/fe-students-api/).

Add the data loading, so the App works as described below:

1. Create a separate file `api.ts` to put all the API calls there.
1. Todos are fetched on page load from [GET todos endpoint](https://mate.academy/students-api/todos). (`useEffect(() => { ... }, [])`)
1. Each todo has a button to select a user but `selectedUserId` is stored in the `App`. (pass a callback to the `TodoList`)
1. `CurrentUser` component receives `userId` as a prop and loads user details from [GET user endpoint](https://mate.academy/students-api/users/1) (replace 1 with a given `userId`).
1. If I select another user the details should be updated. (`useEffect(() => { ... }, [userId])`).
1. If I select the same user there should not be a request to the server.
1. Add a button `Clear` into the `CurrentUser` to clear the selectedUser in the `App`
1. Add an `<input>` to the `TodoList` to filter the todos by title
1. Add a `<select>` to the `TodoList` to show `value="all"`, `value="active"`(not completed) or `value="completed"` todos.
1. (*) Add `Randomize` button to the `TodoList` to show the todos in a random order.

## REQUIREMENTS

- the element with the list of todos (`<ul>` or `<ol>`) in `TodoList` should have a `data-cy="listOfTodos"` attribute
- the `<input>` element for filtering todos by title in `TodoList` should have a `data-cy="filterByTitle"` attribute
- the element for the user "name" in `CurrentUser` should have a `data-cy="userName"` attribute
- the button to select a user should have a `data-cy="userButton"` attribute
