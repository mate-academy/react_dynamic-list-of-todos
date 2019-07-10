# React dynamic list of TODOs


DEMO LINK: (https://djkamry22.github.io/react_dynamic-list-of-todos/)


## Task

By requesting [https://jsonplaceholder.typicode.com/todos](https://jsonplaceholder.typicode.com/todos) and [https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users), create and display a list of TODO items.

Create `TodoList` (for the whole list), `TodoItem` (for a single TODO item), and `User` (for displaying information about a user). `TodoList` should display a list of `TodoItem`s; each `TodoItem` must display the basic info about an item as well as the `User` the item belongs to. You can choose yourself what exact information you want to present and how, but you need to show at least the title of the item, the name of the user and whether the item is completed.

Initially `TodoList` shows a "Load" button. On click disable the button, change its text to "Loading..." and download the data. Once the data has been loaded, hide the button altogether and display the TODO items instead.

Additionally, you should provide a capability of sorting the items either by title, user or its status (whether the item is completed or not).
