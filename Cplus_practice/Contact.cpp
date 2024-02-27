#include "Contact.h"


Contact::Contact(string N){
    name = N;
    next = NULL;
}



ostream& operator<<(ostream& os, const Contact& c){
    return os << "Name: " << c.name;
}