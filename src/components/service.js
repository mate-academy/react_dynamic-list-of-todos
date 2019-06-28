export default class Service {
    constructor() {
        this.apiBase = 'https://jsonplaceholder.typicode.com/';
    }

    async getUsers() {
        return await this._getData('users')
            .then(res => {
                return res.reduce((accumulator, currentValue) => {
                    accumulator[currentValue.id] = currentValue;
                    return accumulator;
                }, {});
            });
    }

    async getTodos() {
        return await this._getData('todos');
    }

    async _getData(type) {
        return await fetch(`${this.apiBase}${type}`)
            .then(res => res.json());
    };
}