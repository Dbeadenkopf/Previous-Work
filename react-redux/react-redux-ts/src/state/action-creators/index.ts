// this will contain our action creators 

import { ActionType } from "../action-types"
import {Dispatch} from "redux"
import {Action} from "../actions/index"
// which are functions that dispatch actions



// THe action creator for depositing money 
export const depositMoney = (amount: number) => {
    return (dispatch: Dispatch<Action>) =>{
        dispatch({
            type: ActionType.DEPOSIT,
            payload: amount
        })
    }
}

// Action creator for withDrawing money
export const withdrawMoney = (amount: number) => {
    console.log(amount)
    return (dispatch: Dispatch<Action>) =>{
        dispatch({
            type: ActionType.WITHDRAW,
            payload: amount
        })
    }
}


// Action creator for bankrupt , which just zeros out the balance
export const bankrupt = () => {
    return (dispatch: Dispatch<Action>) =>{
        dispatch({
            type: ActionType.BANKRUPT
        })
    }
}




