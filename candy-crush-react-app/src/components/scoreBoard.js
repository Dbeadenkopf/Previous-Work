// THis file will contain the components to track the score of the game 

// creating the scoreboard component
const ScoreBoard = ({score}) => {
    return (
        <div className = "score-board">
            <p>Score: </p>
            <h2>{score}</h2>
        </div>
    )
}




export default ScoreBoard;