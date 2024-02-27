#ifndef CONTACTLIST_H_
#define CONTACTLIST_H_

/// must include contact node in order to access it
#include "Contact.h"
using namespace std;

class ContactList{
    public:
        ContactList();
        // function to add to the head of the list
        void addToHead(const string & name);

        //lets make a function to print out the items in our linked list
        void printList();
       
        private:
            Contact* head;
            int size;
};



#endif