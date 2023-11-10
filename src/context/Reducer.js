export const initialState = {
    mail: "",
    userName: "",
};
export const reducerCase = {
    SET_MAIL: "SET_MAIL",
    SET_NAME: "SET_NAME",
};
export const reducer = (state, action) => {
    switch (action.type) {
        case reducerCase.SET_MAIL:
            return { ...state, mail: action.mail };
        case reducerCase.SET_NAME:
            return { ...state, userName: action.userName };
        default:
            return state;
    }
}