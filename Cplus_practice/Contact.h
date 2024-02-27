#ifndef CONTACT_H_
#define CONTACT_H_

#include <iostream>
#include <string>

using namespace std;

class Contact{

    // since we are going to overload the insertion operator , need one
    friend std::ostream& operator <<(std::ostream& os, const Contact& c);

    friend class ContactList; // to access the private values of contact List

    public:
        Contact(string n);

    private:
        string name;
        // we need a pointer just like with nodes that can reference
        // the contact list 
        Contact* next; // pointing to the next thing in the linked list
};






#endif




