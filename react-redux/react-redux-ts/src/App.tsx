import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useDispatch  } from "react-redux"
import { bindActionCreators } from 'redux';
import { actionCreators, State } from './state';
import { useSelector } from 'react-redux';


function App() {
  const dispatch = useDispatch();

  const {depositMoney,withdrawMoney,  bankrupt } = bindActionCreators(actionCreators, dispatch)
  const amount = useSelector((state: State) => state.bank)

  return (
    // creating the onlcick we are here
    <div className="App">
        <h3> Your Account</h3>
        <h1>{amount}</h1>
        <button onClick={() => depositMoney(5)} className="depositButton glow-button1">Deposit</button>
        <button onClick={() => withdrawMoney(5)} className="withdrawButton glow-button2">Withdraw</button>
        <button onClick={() => bankrupt()} className="bankruptButton glow-button3">Bankrupt</button>
    </div>
  );
}

export default App;
