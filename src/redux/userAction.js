import store from "./store";

export const setUser = (data) => {
    store.dispatch({
        type: "SET",
        data: data
    });
};
