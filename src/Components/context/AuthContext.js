import { createContext, useReducer, useEffect } from 'react';
import { dbAuth } from '../firebase/Config';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                user: null, 
                authIsReady: false
            }
        case 'AUTH_IS_READY':
            return {
                ...state,
                authIsReady: true,
                user: action.payload
            }
        default:
            return state;
    }
}

export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false
    });

    useEffect(() => {
        const unsub = dbAuth.onAuthStateChanged((user) => {
            dispatch({
                type: 'AUTH_IS_READY',
                payload: user
        });
        unsub();
    });
    }, []);
    

    console.log('AuthContext state: ', state);
    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}