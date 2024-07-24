// this file will contain most of our sorting algorithms 
#include <iostream>
#include <algorithm>
using namespace std;



void bubbleSort(int arr[], int n){
    for(int i = 0; i < n - 1; i++){
        for(int j = 0; j < n - i - 1; j++){
            if(arr[j] > arr[j+1]){
                swap(arr[j], arr[j+1]);
            }
        }
    }
}

void displayArr(int arr[], int size){
    cout << "[";
    for(int i = 0; i < size; i++){
        cout << arr[i] << " ";
    }
    cout << "]";
    cout << endl;
}





int main(){
    int arr[] = {22, 10, 3, 34, 17, 9};
    int N = sizeof(arr)/ sizeof(arr[0]);
    bubbleSort(arr, N);
    cout << "Sorted Array: ";
    displayArr(arr, N);


    return 0;
}