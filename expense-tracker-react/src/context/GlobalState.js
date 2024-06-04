// this file will hold our global state so that other components and files 
// can access throughout the entire project
import React , {createContext, useReducer} from 'react';
import AppReducer from './AppReducer';

// initial state 
const initialState  = {
    // changed our intial state to house an empty array to hold transactions
    transactions: []
}

// Create context 
export const GlobalContext = createContext(initialState);

//provider component that wraps all the components
export const GlobalProvider = ({children}) => {
    const [state,dispatch] = useReducer(AppReducer,initialState);

    // Actions to make calls to reducers 
    function deleteTransaction(id){
        dispatch({
            type: 'DELETE_TRANSACTION',
            payload: id
        });
    }
    function addTransaction(transaction){
        dispatch({
            type: 'ADD_TRANSACTION',
            payload: transaction
        });
    }
    return (<GlobalContext.Provider value={{transactions: state.transactions, deleteTransaction, addTransaction}}>
        {children}
    </GlobalContext.Provider>
    )
}