// this file will include all of our fileio practice
#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>
using namespace std;

void displayFileContents(const string & filename){
    ifstream inputFile(filename);
    if(inputFile.is_open()){
        string line;
        while(getline(inputFile, line)){
            cout << line << endl;
        }

        inputFile.close();
    }else{
        cout << "There was a problem with opening the file" << endl;
    }
}





void addtoFile(const string & filename){
    ofstream outputFile;
    outputFile.open(filename, ios::app);
    if(outputFile.is_open()){
        string newData;
        cout << "Add new info to file: ";
        getline(cin,newData);
        outputFile << newData << endl;

        outputFile.close();
        cout << "\t\t Data added successfully \t\t\n";
        displayFileContents(filename);
    }else{
        cout << "There was a problem with opening your file " << endl;
    }
}



int countwordsinFile(const string & filename){
    ifstream inputFile(filename);
    if(inputFile.is_open()){
        string line;
        int wordCounter = 0;
        while(getline(inputFile, line)){
            stringstream ss(line);
            while(ss >> line){
                wordCounter++;
            }
        }
        inputFile.close();
        cout << "Words have been successfully count! " << endl;
        return wordCounter;
    }else{
        cout << "There was a problem with opening this file " << endl;
    }
    return 0;
}


// lets change a specified word in a .txt file 
void findandReplace(const string & filename){
    ifstream inputFile(filename);
    ofstream outputFile("dbz_replaced.txt");
    if(inputFile.is_open() && outputFile.is_open()){
        string line;
        string searchWord = "Goku";
        string replaceWord = "Kakorot";
        while(getline(inputFile,line)){
            size_t pos = line.find(searchWord);
            while(pos!= string::npos){
                line.replace(pos, searchWord.length(), replaceWord);
                pos = line.find(searchWord, pos + replaceWord.length());
            }
            outputFile << line << "\n";
        }

        inputFile.close();
        outputFile.close();
        cout << "Find and Replace has been successful " << endl;
        displayFileContents("dbz_replaced.txt");
    }else{
        cout << "There was a problem with opening the files " << endl;
    }
}


void encryptFile(const string & inputFile, const string & outputFile){
    ifstream input(inputFile);
    ofstream output(outputFile);
    if(input.is_open() && output.is_open()){
        char ch;
        while(input.get(ch)){
            ch++;
            output.put(ch);
        }

        input.close();
        output.close();
        cout << "File encrypted successfully " << endl;
    }else{
        cout << "Failed to open files " << endl;
    }
}


void decryptFile(const string & inputFile, const string & outputFile){
    ifstream input(inputFile);
    ofstream output(outputFile);
    if(input.is_open() && output.is_open()){
        char ch;
        while(input.get(ch)){
            ch--;
            output.put(ch);
        }

        input.close();
        output.close();
        cout << "\t\t File was encrypted successfully \t\t\n";
    }else{
        cout << "File to open files " << endl;
    }
}

// lets take a CSV or spreadsheet document and display if in tabular form
vector<string> splitString(const string & fileName, strin str)


int main(){
    string first_File = "dbz_encrypted.txt";
    string second_File = "dbz_decrypted.txt";
   // encryptFile(first_File, second_File);
   // decryptFile(first_File, second_File);
    displayFileContents(second_File);


    return 0;
}