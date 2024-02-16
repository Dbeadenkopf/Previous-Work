import { depositMoney } from "../action-creators";
import { ActionType } from "../action-types/index";
import { Action } from "../actions/index"

// with redux we need an initial state
const initialState = 0; 






// here we are gonna create our reducer , receives the
// current state and returns a new state, this switch
// statement within it acts as a type guard 
const reducer = (state: number = initialState, action: Action) => {
    switch (action.type){
        case ActionType.DEPOSIT:
            return state + action.payload;
        case ActionType.WITHDRAW:
            return state - action.payload;
        case ActionType.BANKRUPT:
            return 0;
        default:
            return state;
    }
}


export default reducer