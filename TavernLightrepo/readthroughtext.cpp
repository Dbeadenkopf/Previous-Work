#include <iostream>
#include <fstream>

using namespace std;



void readContentsofFile(const string & filename){
    ifstream File(filename);
    if(File.is_open()){
        string line;
        while(getline(File,line)){
            cout << line << endl;
        }   
    }else{
        cout << "There was a problem with opening your file " << endl;
    }
}







int main(){
    string fName = "fixorimprove.txt";
    readContentsofFile(fName);


    return 0;
}