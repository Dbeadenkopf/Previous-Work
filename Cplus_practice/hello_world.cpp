// lets do the fizzbuzz problem
#include <iostream>
#include <vector>
#include <string>

using namespace std;

vector<string> FizzBuzz(int N){
    vector<string> results;
    for (int i = 0; i < N; i++){
        if (i % 3 == 0 && i % 5 == 0){
            results.push_back("Fizzbuzz");
        }
        else if (i % 3 == 0){
            results.push_back("Fizz");
        }
        else if (i % 5 == 0){
            results.push_back("Buzz");
        }else{
            results.push_back(to_string(i));
        }
        
    }
    return results;
}





int main(){
    int n = 15;
    vector<string> results = FizzBuzz(n);

    for(int i = 0; i < n; i++){
        cout << results[i] << endl;
    }

    return 0;
}

