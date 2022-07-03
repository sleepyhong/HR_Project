import store from './store';

export default function userReducer(preState = {}, action) {
    const { type, data } = action;
    Object.freeze(preState);

    switch (type) {
        case "SET":
            const newState = { ...preState };
            for (let key in data) {
                newState[key] = data[key];
            }
            return newState;
        default:
            return preState;
    }
}
