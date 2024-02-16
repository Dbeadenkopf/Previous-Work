'use strict'


 import Header  from "./Header.js"

// now we are going to className everything in css
// so lets change oour width so it doesnt look as funky






function Footer(){
    return(
        <footer>
        © 2022 TheHumanDave development. All rights reserved
        </footer>
    )
}

function OrderedList(){
    return(
        <div>
        <h1 className="header">Reasons I like React</h1>
        <ol>
             <li>Its Composable</li>
            <li>Its Imperative</li>
            <li>Its A popular language</li>
        </ol>
        </div>
    )
}

function PageOne(){
    return(
        <div>
            <Header/> 
            <OrderedList/>
            <Footer/>
        </div>
    )
}


ReactDOM.render(<PageOne/>, document.getElementById("root"));







// we began to touch on using css with our jsx