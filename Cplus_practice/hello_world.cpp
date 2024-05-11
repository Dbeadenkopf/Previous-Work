// lets make a program to find and replace a specific word in a text file
#include <iostream>
#include <fstream>

using namespace std;


void displayFileContents(const string & filename){
    ifstream outputFile(filename);
    if(outputFile.is_open()){
        string line;
        while(getline(outputFile,line)){
            cout << line << "\n";
        }

        outputFile.close();
    }else{
        cout << "There was a problem with opening this file " << endl;
    }
    
}





int main(){
    ifstream inputFile("dbz.txt");
    ofstream outputFile("dbz_new.txt");
    if(inputFile.is_open() && outputFile.is_open()){
        string line;
    }


    return 0;
}