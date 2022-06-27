import store from './store';

export default function userReducer(preState = {}, action) {
    const { type, data } = action;
    Object.freeze(preState);

    switch (type) {
        case "SET": {
            const newState = Object.assign({}, preState);
            newState['type'] = data;

            return newState;
        }
        default:
            return preState;
    }
}
