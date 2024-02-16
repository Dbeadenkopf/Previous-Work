import {ActionType} from "../action-types"


// interface for deposit action
interface DepositAction {
    type: ActionType.DEPOSIT
    payload: number   
}

// interface object for withdraw
interface WithdrawAction{
    type: ActionType.WITHDRAW
    payload: number
}


//interface object for BankRupt
interface BankruptAction{
    type: ActionType.BANKRUPT
}
// a type object to handle the logic between the three 
// interfaces
export type Action = DepositAction | WithdrawAction | BankruptAction; 