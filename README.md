# React dynamic list of TODOs

The goal of this task is to teach you:
- how to work with a not detailed task description;
- to learn the existing code before you start;
- to understand tests and why they fail;
- to try the working page and implement the same behaviour;

> Here is [the working page](https://mate-academy.github.io/react_dynamic-list-of-todos/)

You are given the markup for the `App`, `TodosList`, `TodoFilter`, `TodoModal`
and `Loader` components. Load data from the API and show it using the given components.

DONE - 1. Load [the todos](https://mate-academy.github.io/react_dynamic-list-of-todos/api/todos.json) when the `App` is
loaded and show them using `TodoList` (check the code in the `api.ts`);
DONE - 1. Show the `Loader` when waiting any data from the server (check the `components` folder);
DoNE - 1. Check how the `wait` function is used in the `api.ts` to ensure that `Loader` works as expected;
DONE - 1. When the `Show` button is clicked open the `TodoModal` with a selected `todo`;
DONE - 1. Don't forget to load [user details](https://mate-academy.github.io/react_dynamic-list-of-todos/api/users/1.json) (replace `1` with the actual `userId`);
DONE - 1. Show the Loader while waiting for the user;
DONE - 1. `x` button should close the modal;
DONE - 1. The `select` should filter todos by the `completed` status: `all`, `completed` and `active`(not completed) todos;
DONE - 1. Use the `input` in the `TodoFilter` to filter the `todos` by `title`;
DONE    - show the `x` button when the `query` is entered;
DONE    - the `x` button should clear the `query` and reset the todos;

## Instructions

- Implement a solution following the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline).
- Use the [React TypeScript cheat sheet](https://mate-academy.github.io/fe-program/js/extra/react-typescript).
- Open one more terminal and run tests with `npm test` to ensure your solution is correct.
DONE - Replace `<your_account>` with your Github username in the [DEMO LINK](https://Manankin.github.io/react_dynamic-list-of-todos/) and add it to the PR description.
