import { combineReducers } from "redux";
import bankReducer from "./bankReducer"

// this const object combines our reducers
// we made a defined type and exported it below for this
// reducer object
const reducers = combineReducers({
    bank: bankReducer
})




export default reducers;

// here we created a type of our reducer object 
// this way vscode knows the types of
export type State = ReturnType<typeof reducers>