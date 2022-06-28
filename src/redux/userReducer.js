import store from './store';

export default function userReducer(preState = {}, action) {
    const { type, data } = action;
    Object.freeze(preState);

    switch (type) {
        case "SET": {
            return data;
        }
        default:
            return preState;
    }
}
