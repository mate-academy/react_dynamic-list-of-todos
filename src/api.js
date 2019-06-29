export const completedSort = (todos, sortField) => {
    todos.sort((a, b) => {
        if (a[sortField] < b[sortField]) {
            return 1
        }

        if (a[sortField] > b[sortField]) {
            return -1
        }
        return 0;
    })
}

export const titleSort = (todos, sortField) => {
    todos.sort((a, b) => {
        if (a[sortField] > b[sortField]) {
            return 1
        }

        if (a[sortField] < b[sortField]) {
            return -1
        }
        return 0;
    })
}

export const nameSort = (todos, sortField) => {
    todos.sort((a, b) => {
        if (a[sortField].name > b[sortField].name) {
            return 1
        }

        if (a[sortField].name < b[sortField].name) {
            return -1
        }
        return 0;
    })
}