#include "ContactList.h"



ContactList::ContactList(){
    head = NULL;
    size = 0;
}

void ContactList::addToHead(const string & name){
    // node for reference
    Contact* newOne = new Contact(name);
    if (head == NULL){
        head = newOne; // if its empty , have it point to our new node
    }
    else{
        newOne->next = head;
        head = newOne;
    }
    size++; // each time a new contact is added it icnreases size, tracker to keep tracker inside linkedlist
}

void ContactList::printList(){
    Contact* tp = head;
    while(tp != NULL){
        cout << *tp << endl;
        tp = tp->next; // we need this to drive tp pointer to next node
    }
}