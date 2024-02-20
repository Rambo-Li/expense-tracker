import React, { createContext, useReducer } from 'react';
import axios  from 'axios';

const initState = {
    transactions: [    ],
    error: null,
    loading: true
}

function AppReducer (state, action) {
    switch(action.type) {
        case 'GET_TRANSACTIONS':
            return {
                ...state,
                loading: false,
                transactions: action.payload
            }
        case 'TRANSACTION ERROR':
            return {
                ...state,
                error: action.payload
            }
        case 'DELETE_TRANSACTION':
            return {
                ...state,
                transactions: state.transactions.filter(transaction => transaction._id !== action.payload)
            };
        case 'ADD_TRANSACTION':
            return {
                ...state,
                transactions: [...state.transactions, action.payload]
            }
        default: 
            return state
    }
}

export const GlobalContext = createContext(initState);

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initState);

    async function getTransactions() {
        try {
            const res = await axios.get('/api/v1/transactions');
            dispatch({
                type: 'GET_TRANSACTIONS',
                payload: res.data.data                
            })
        } catch (err) {
            dispatch ({
                type: "TRANSACTION ERROR",
                payload: err.message
            })
        }
    }

    async function deleteTransaction(id) {
        try {
            await axios.delete(`api/v1/transactions/${id}`);
            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            });
        } catch (err) {
            dispatch ({
                type: "TRANSACTION ERROR",
                payload: err.message
            })
        }        
    }

    async function addTransaction(transaction) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('api/v1/transactions', transaction, config);
            dispatch({
                type: 'ADD_TRANSACTION',
                payload: res.data.data
            });
        } catch (err) {
            dispatch ({
                type: "TRANSACTION ERROR",
                payload: err.message
            })
        }        
    }

    return ( <GlobalContext.Provider value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        getTransactions,
        deleteTransaction,
        addTransaction
    }}>
        {children}
    </GlobalContext.Provider>
    )
}