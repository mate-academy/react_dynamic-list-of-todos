# React dynamic list of TODOs

By requesting [https://jsonplaceholder.typicode.com/todos](https://jsonplaceholder.typicode.com/todos) and [https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users), create and display a list of TODO items.

Create and use three components: `TodoList` (for the whole list), `TodoItem` (for a single TODO item), and `User` (for displaying information about a user). `TodoList` should display a list of `TodoItem`s; each `TodoItem` must display the basic info about an item as well as the `User` the item belongs to. You can choose yourself what exact information you want to present and how, but you need to show at least the title of the item, the name of the user and whether the item is completed.

Initially `TodoList` has to present the user with a button labeled "Load". Only when the user hits the button, the script starts to download the data; the label of the button has to change to "Loading..." and the button must become disabled. Once the data has been loaded, hide the button altogether and display the TODO items instead.

Additionally, you should provide a capability of sorting the items either by title, user or its status (whether the item is completed or not).
