# React dynamic list of TODOs
- Replace `<your_account>` with your Github username in the
  [DEMO LINK](https://DimaBrushnivskyi.github.io/react_dynamic-list-of-todos/)
- Follow the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline)
- Use [React TypeScript cheat sheet](https://mate-academy.github.io/fe-program/js/extra/react-typescript)

## Description
You are given a basic markup for the App, TodosList and CurrentUser components and [the API](https://mate-academy.github.io/fe-students-api/).

Add the data loading, so the App works as described below:

1. Create a separate file `api.ts` to put all the API calls there.
2. Todos are fetched on page load from [GET todos endpoint](https://mate.academy/students-api/todos). (`useEffect(() => { ... }, [])`)
3. Each todo has a button to select a user but `selectedUserId` is stored in the `App`. (pass a callback to the `TodoList`)
4. `CurrentUser` component receives `userId` as a prop and loads user details from [GET user endpoint](https://mate.academy/students-api/users/1) (replace 1 with a given `userId`).
5. If I select another user the details should be updated. (`useEffect(() => { ... }, [userId])`).
6. If I select the same user there should not be a request to the server.
7. Add a button `Clear` into the `CurrentUser` to clear the selectedUser in the `App`
8. Add an `<input>` to the `TodoList` to filter the todos by title
9. Add a `<select>` to the `TodoList` to show `all`, `active`(not completed) or `completed` todos.
10. (*) Add `Randomize` button to the `TodoList` to show the todos in a random order.
