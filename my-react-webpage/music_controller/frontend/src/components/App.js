// This file will have our react app code 
import React, {Component} from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";




export default class App extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
        <div className="center">
            <HomePage />
        </div>
        );
    }
}


// rendering react component

const appDiv = document.getElementById("app");
render(<App/>,appDiv);