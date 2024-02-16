"use strict" // we use this before every script program to ke
// lets now practice some react 
//import React from 'react';

const e = React.createElement;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return e(
        <div>Hello React!</div>
    );
  }
}


/*function FunctionDeclaration(){
    return <div>Hello React!</div>;
}

function ArrowFunction(){
    return <div>Hello React, again!</div>;
}*/

// to use react we need a react component
const domContainer = document.querySelector('#react_component');
const root = ReactDOM.createRoot(domContainer);
root.render(e(App));


