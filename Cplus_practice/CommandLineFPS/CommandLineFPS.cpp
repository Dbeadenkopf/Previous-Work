#include <iostream>
#include <vector>
#include <utility>
#include <algorithm>
#include <chrono>
using namespace std;

// we are going to need the console to do this
// so we must include a windows function
#include <Windows.h>

int nScreenWidth = 120;
int nScreenHeight = 40;


// now we need to now where the character is, cant use integers cause movement would be clunky
float fPlayerX = 0.0f;
float fPlayerY = 0.0f

// we also need the angle the player is looking at
float fPlayerA = 0.0f;


// in any FPS there is gonna be a map , so lets put in some constants
int nMapHeight = 16;
int nMapWidth = 16;



int main(){

    // lets through in some Unicode to create a buffer
    wchar_t *screen = new wchar_t[nScreenWidth*nScreenHeight];
    HANDLE hConsole = CreateConsoleScreenBuffer(GENERIC_READ | GENERIC_WRITE, 0 , NULL, CONSOLE_TEXTMODE_BUFFER, NULL);
    SetConsoleActiveScreenBuffer(hConsole);
    DWORD = dwBytesWrtten = 0;

    // with any game engine you need a gameloop
    while(true){
    // if you would like to write to the screen then use this 
        screen[nSCreenWidth * nScreenHeight - 1] = '\0';
        WriteConsoleOutputCharacter(hConsole, screen, nScreenWidth * nScreenHeight, {0,0}, &dwBytesWrtten);
    }
    return 0;
}