import { createContext, useContext, useReducer } from "react";
import { initialState, reducerCase, reducer } from "./Reducer";

const AppContext = createContext();
export const AppState = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const setMail = (mail) => dispatch({
        type: reducerCase.SET_MAIL,
        mail
    });
    const setUserName = (userName) => dispatch({
        type: reducerCase.SET_NAME,
        userName
    })

    return (
        <AppContext.Provider value={{
            data: state,
            setMail,
            setUserName,
        }}>{children}</AppContext.Provider>
    );
}

const useAppState = () => useContext(AppContext);
export default useAppState;