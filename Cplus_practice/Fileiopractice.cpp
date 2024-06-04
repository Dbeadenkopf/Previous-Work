#include <iostream>
#include <cmath>
#include <algorithm>
#include <fstream>
#include <sstream>
#include <vector>
// write a c++ program to find and replace a specific word in a textfile

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
        cout << "There was a problem with opening this file " << endl;
    }             
}


// write a c++ to copy the contents of one file to antoher
void copyFileContents(const string & filename){
    ifstream inputFile(filename);
    ofstream outputFile("dbz_copied.txt");
    if(inputFile.is_open() && outputFile.is_open()){
        string line;
        while(getline(inputFile,line)){
            outputFile << line << endl;
        }

        inputFile.close();
        outputFile.close();
        cout << "File was copied successfully " << endl;
    }else{
        cout << "There was a problem with opening the file " << endl;
    }
}

// make a c++ prgram to find and replace a specific word in a text file 
void findandReplace(const string & filename){
    ifstream inputFile(filename);
    ofstream outputFile("dbz_replaced.txt");
    if(inputFile.is_open() && outputFile.is_open()){
        string line;
        string searchWord = "Vegito";
        string replaceWord = "Super Vegito";
        while(getline(inputFile,line)){
            size_t pos = line.find(searchWord);
            while(pos!=string::npos){
                line.replace(pos, searchWord.length(), replaceWord);
                pos = line.find(searchWord, pos + replaceWord.length());
            }
            outputFile << line << endl;
        }
        inputFile.close();
        outputFile.close();
        cout << "Find and replace was a success" << endl;
        displayFileContents("dbz_replaced.txt");
    }
}


// lets make a program that can append data to an exisiting file 
void addDataToFile(const string & filename){
    ofstream outputFile;
    outputFile.open(filename, ios::app);
    if(outputFile.is_open()){
        string newData;
        cout << "Enter the data to be added to the file: ";
        getline(cin,newData);
        outputFile << newData << endl;
        outputFile.close();
        cout << "Data was successfully added " << endl;
        displayFileContents(filename);
    }else{
        cout << "There was a problem with opening this file " << endl;
    }
}



// lets sort the lines of a text file
void sortlinesofFile(const string & filename){
    ifstream inputFile(filename);
    ofstream outputFile("dbz_sorted.txt");
    if(inputFile.is_open() && outputFile.is_open()){
        vector<string> lines;
        string line;
        while(getline(inputFile,line)){
            lines.push_back(line);
        }
        sort(lines.begin(), lines.end());
        copy(lines.begin(), lines.end(), ostream_iterator<string>(outputFile, "\n"));
        inputFile.close();
        outputFile.close();
        cout << "Lines of file were sorted successfully " << endl;
        displayFileContents("dbz_sorted.txt");
    }else{
        cout << "There was a problem with opening the file " << endl;
    }
}

// lets make a program that can merge files together 
void mergeFilesTogether(const string & filename){
    vector<string> inputFiles;
    inputFiles.push_back("test4.txt");
    inputFiles.push_back("test3.txt"); 
    inputFiles.push_back("test2.txt");
    inputFiles.push_back("test1.txt");

    cout << "The contents of test1-4.txt are " << endl;
    displayFileContents("test1.txt");
    displayFileContents("test2.txt");
    displayFileContents("test3.txt");
    displayFileContents("test1.txt");

    string outputFile = "merged_test_file.txt";
    ofstream mergedFile(outputFile);
    if(mergedFile.is_open()){
        for(const auto & inputFile: inputFiles){
            ifstream inputFileStream(inputFile);
            if(inputFileStream.is_open()){
                string line;
                while(getline(inputFileStream, line)){
                    mergedFile << line << "\n";
                }
                inputFileStream.close();
            }else{
                cout << "Failed to open input file: " << inputFile << endl;
            }
        }
        mergedFile.close();
        cout << "\nFiles merged successfully. " << endl;
        cout << "\nContent of the merged file: " << endl;
        displayFileContents("merged_test_file.txt");
    }else{
        cout << "There was a problem with opening this file " << endl;
    }
}
int main(){
   mergeFilesTogether("test1.txt");
    //sortlinesofFile("dbz.txt");
    //addDataToFile("dbz.txt");
    //findandReplace("dbz.txt");
   // copyFileContents("dbz.txt");
    return 0;
}