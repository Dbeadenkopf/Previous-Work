// lets learn some linked list data structures  
#include <iostream>
#include <stdio.h>
#include <stdlib.h> // this is used to create new memory wich we need when 
// making a linked list

using namespace std;

// a node is a self refrential structure in c++ programming , meaning it contains a piinter to itself
struct Node {
    int data;
    struct node *link; // pointer to the other node, struct node
};




int main(){
    struct node *head = NULL; // this is the header pointer to both the data and pointer within the struct
    

    return 0;
}

