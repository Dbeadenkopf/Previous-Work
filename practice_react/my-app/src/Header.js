// this is the common practice
// with functions is to use arrow functions
const Header = () => {
  return (
    <header>
      <img
        src="http://www.pngall.com/wp-content/uploads/2016/05/Trollface.png"
        alt="Problem?"
      />
      <nav className="meme-font">
        <p>Meme Generator</p>
      </nav>
    </header>
  );
};

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
