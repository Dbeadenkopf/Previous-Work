// we dont have to do this since we have the jsx tags in our
// html file but for programming practice
import reactLogo from './react-logo.png';

function Header(){ 
    return(
            <header>
                <nav className="nav">
                    <img src={reactLogo} className="image-width"/>
                    <ul className="nav-items">
                        <li>Pricing</li>
                        <li>About</li>
                        <li>Contact</li>
                    </ul>
                </nav>
            </header>
    )
}

/*const Header = () => {
    return (
        <header>
                <nav className="nav">
                    <img src="./react-logo.png" className="image-width"/>
                    <ul className="nav-items">
                        <li>Pricing</li>
                        <li>About</li>
                        <li>Contact</li>
                    </ul>
                </nav>
        </header>
    )
}*/

// this code is tuck within this file, so we 
// have to export it 
export default Header;