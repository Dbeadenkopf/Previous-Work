// THis is where most of the game logic will
// happen which means moving , take overs, etc
import { useEffect, useState } from "react";
import ScoreBoard from "./components/scoreBoard.js";
import blueCandy from './images/blue-candy.png';
import orangeCandy from './images/orange-candy.png';
import greenCandy from './images/green-candy.png';
import yellowCandy from './images/yellow-candy.png';
import redCandy from './images/red-candy.png';
import purpleCandy from './images/purple-candy.png';
import blank from './images/blank.png'
// for change 

//board size
const width = 8;

//candy colors
// An array that holds all the candy colors 
const candyColors = [blueCandy, greenCandy, orangeCandy, purpleCandy, redCandy, yellowCandy];

// expression app function
const App = () => {
  // lets save this current state by using usestate21qwar  
  const [currentColor, setCurrentColor] = useState([]);

  // for scqaure being dragged
  const [squareBeingDragged, setSqaureBeingDragged] = useState(null);

  // for replacing the sqaure that was dragged and dropped
  const [squareBeingReplaced, setSqaureBeingReplaced] = useState(null);

  // for keeping the scores for each column and rows of three and four
  const [scoreDisplay , setScoreDisplay] = useState(0);  
  // first logic (checking for all three)
  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2]; // this is our column check
      const decidedColor = currentColor[i]; // grabbing first item in colors
      const isBlank = currentColor[i] === blank

      if (
        columnOfThree.every((square) => currentColor[square] === decidedColor && !isBlank)
      ) {
        setScoreDisplay((score) => score + 3) 
        columnOfThree.forEach((square) => (currentColor[square] = blank));
        return true; // so we can reuse this function
      }
    }
  };

  // now lets check for columns of 4
  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3]; // this is our column check
      const decidedColor = currentColor[i]; // grabbing first item in colors

      if (
        columnOfFour.every((square) => currentColor[square] === decidedColor)
      ) {
        setScoreDisplay((score) => score + 4) // each time there is a match improve the score
        columnOfFour.forEach((square) => (currentColor[square] = blank));
        return true;
      }
    }
  };

  //checking for rows
  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2]; // this is our column check
      const decidedColor = currentColor[i]; // grabbing first item in colors
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];
      if (notValid.includes(i)) continue; // if its not valid then dont check

      if (rowOfThree.every((square) => currentColor[square] === decidedColor)) {
        setScoreDisplay((score) => score + 3) 
        rowOfThree.forEach((square) => (currentColor[square] = blank));
        return true;
      }
    }
  };

  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3]; // this is our row check
      const decidedColor = currentColor[i]; // grabbing first item in colors
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47,
        53, 54, 55, 62, 63, 64,
      ];
      if (notValid.includes(i)) continue; // if its not valid then dont check

      if (rowOfFour.every((square) => currentColor[square] === decidedColor)) {
        setScoreDisplay((score) => score + 4) 
        rowOfFour.forEach((square) => (currentColor[square] = blank));
        return true;
      }
    }
  };

// checking the score on the console
  console.log(scoreDisplay);


  // Use dragstart to have the ID we are dragging 
  const dragStart = (e) => {
    console.log(e.target);
    console.log('dragStart');
    setSqaureBeingDragged(e.target);
  }

  //
  const dragDrop = (e) => {
    console.log(e.target);
    console.log("dragDrop");
    setSqaureBeingReplaced(e.target);
  }

  // This is where alot of the logic of the end result of 
  // having a peice replaced happen , alot of code logic
  const dragEnd = (e) => {
    console.log(e.target);
    console.log("dragEnd");
    const squareBeingDraggedID = parseInt(squareBeingDragged.getAttribute('data-id'))
    const squareBeingReplacedID = parseInt(squareBeingReplaced.getAttribute('data-id'))

    // time to switch out colors, change color to current color i am dragging
    currentColor[squareBeingReplacedID] = squareBeingDragged.getAttribute('src')
    // 
    currentColor[squareBeingDraggedID] = squareBeingReplaced.getAttribute('src')

    console.log('sqaureBeingDraggedID', squareBeingDraggedID);
    console.log('sqaureBeingReplacedID', squareBeingReplacedID);

    // Lets make some valid moves in order for a sqaure to be replaced correctly
    const validMoves = [
      squareBeingDraggedID -1,
      setSqaureBeingDragged - width,
      squareBeingDraggedID + 1,
      squareBeingDraggedID + width
    ]
    // bascially this code is if the sqare is the coordinated above it is a valid move
    const validMove = validMoves.includes(squareBeingReplacedID)

    const isAColumnOfFour = checkForColumnOfFour()
    const isARowOfFour = checkForRowOfFour()
    const isAColumnOfThree = checkForColumnOfThree()
    const isARowOfThree = checkForRowOfThree()
    
    if (squareBeingReplacedID && validMove && (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)){
      setSqaureBeingDragged(null) // start again
      setSqaureBeingReplaced(null)
    } else{ // below code is for if the change happened then put it back 
      currentColor[squareBeingReplacedID] = squareBeingReplaced.getAttribute('src')
      currentColor[squareBeingDraggedID] = squareBeingDragged.getAttribute('src')
      setCurrentColor([...currentColor]);
    }


  

  }
  // board creation function
  const createBoard = () => {
    const emptyRandomColors = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)];
      emptyRandomColors.push(randomColor);
    }
    setCurrentColor(emptyRandomColors);
  };

  // function to move squares up and dow
  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 55; i++) {
      // The syntax below is used for in case the top is empty we need tommove down
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i); // Holding on to the first row
      if (isFirstRow && currentColor[i] === blank) {
        let randomNumber = Math.floor(Math.random() * candyColors.length);
        currentColor[i] = candyColors[randomNumber];
      }
      if ((currentColor[i + width]) === blank) {
        // if below sqaure is blank
        currentColor[i + width] = currentColor[i]; // go ahead and move it down
        currentColor[i] = blank; // after that move that would mean the above one is blank
      }
    }
  };

  //createBoard();

  // To prevent rerendering
  // after render we want it
  // to do something
  useEffect(() => {
    createBoard();
  }, []);

  // useeffect to check for matches of
  // threes
  useEffect(() => {
    // since the board will be changing alot
    // we need to check for collumns of three every 100 milisecond
    // so lets create timer
    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForRowOfFour();
      checkForColumnOfThree();
      checkForRowOfThree();
      moveIntoSquareBelow();
      setCurrentColor([...currentColor]); // ... is the expand syntax, it expands into multple arrarys
    }, 100);
    return () => clearInterval(timer); // properly clear interval
  }, [
    checkForColumnOfFour,
    checkForRowOfFour,
    checkForColumnOfThree,
    checkForRowOfThree,
    moveIntoSquareBelow,
    currentColor,
  ]); // we need to put in arrary b/c this is a change

  return (
    <div className="app">
      <div className="game">
        {currentColor.map((candyColors, index) => (
          <img
            key={index}
            src={candyColors}
            alt={candyColors}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop = {dragDrop}
            onDragEnd={dragEnd}
          />
        ))}
      </div>
        <ScoreBoard score={scoreDisplay}/>
    </div>
  );
};

export default App;
