// This file will contain the code for the game tictactoe
#include <iostream>
#include <string>
using namespace std;





int main(){
    // first we need to create the board which is
    // a 2D array with characters
    char board[3][3] = {
        {' ', ' ', ' '},
        {' ', ' ', ' '},
        {' ', ' ', ' '}
    };

    // now we make our two player 
    const char PlayerX = 'X';
    const char PlayerO = 'O';

    // need a new variable to keep track of the current player 
    // it starts with player X and then by logic changes to player O
    char currentPlayer = PlayerX;

    // so we are now going to make a gameloop, there are 9 tiles
    // and so we need to loop 9 times until the board is filled


    // keeping track of row and columns for decision making 
    // The -1 stands for undecided and is the default value
    int row = -1;
    int col = -1;

    // variable to hold the current winner 
    char winner = ' ';



    // print game board , upgraded display 
    // with game loop so players can see the current state
    // of the board 
    for (int i = 0; i < 9 ; i++){
        cout << "   |   |   " << endl;
        cout << " " << board[0][0] << " | " << board[0][1] << " | " << board[0][2] << endl;
        cout << "___|___|___" << endl;
        cout << "   |   |   " << endl;
        cout << " " << board[1][0] << " | " << board[1][1] << " | " << board[1][2] << endl;
        cout << "___|___|___" << endl;
        cout << "   |   |   " << endl;
        cout << " " << board[2][0] << " | " << board[2][1] << " | " << board[2][2] << endl;
        cout << "   |   |   " << endl;

        // if there is a winner break the game
        if (winner!= ' '){
            break;
        }


        // gets player input 
        cout << "Current Player is " << currentPlayer << endl;
        // we need to account for the user entering invalid and 
        // out of range values 
        while(true){
            cout << "Enter a row and column from 0-2: ";
            cin >> row >> col;
            if(row < 0 || row > 2 || col < 0 || col > 2){
                cout << "invalid input, try again " << endl;
            }
            else if (board[row][col]!= ' '){
                cout << "Tile is full , try again" << endl;
            }
            else{
                break; // if none of these conditions are true break
            }
            // then reset the values of the rows and columns 
            row = -1;
            col = -1;
            // Accounting for invalid inputs that are not numbers
            cin.clear(); // clear the error flags
            cin.ignore(10000, '\n'); // discard values 
            // 10000 means skip that many characters in the input stream
        }
        // set that selection to the board
        board[row][col] = currentPlayer;
        currentPlayer = (currentPlayer == PlayerX) ? PlayerO : PlayerX;

        // end of turns check winners

        // rows - horizontal check
        for (int r = 0; r < 3; r++){
            if(board[r][0]!= ' ' && board[r][0] == board[r][1] && board[r][1] == board[r][2]){
                winner = board[r][0];
                break;
            }
        }

        // columns - vertical check
        for(int c = 0; c < 3; c++){
            if(board[0][c]!= ' ' && board[0][c] == board[1][c] && board[1][c] == board[2][c]){
                winner = board[0][c];
                break;
            }
        }

        // diagonal check 
        if(board[0][0]!= ' ' && board[0][0] == board[1][1] && board[1][1] == board[2][2]){
            winner = board[0][0];
        }
        // accounting for the other way top right
        else if(board[0][2]!= ' ' && board[0][2] == board[1][1] && board[1][1] == board[2][0]){
            winner = board[0][2];
        }

        }

    // using winner to display message of who won
    if (winner!= ' '){
        cout << "Player" << winner << " is the winner!" << endl;
    }
    // 
    else{
        cout << "Tie!" << endl;
    }
    return 0;
}

